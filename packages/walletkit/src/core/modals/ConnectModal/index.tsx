import { Modal } from '@/core/base/components/Modal';
import { useConfig } from '@/core/providers/WalletKitProvider/context';
import { useRouter } from './RouteProvider/context';
import { useConnectModal } from './context';
import { Navbar } from '@/core/components/Navbar';

export function ConnectModal() {
  const { eventConfig } = useConfig();
  const { isOpen, onClose } = useConnectModal();
  const { view, history, back } = useRouter();

  const showBack = history.length > 1;

  return (
    <Modal
      className="wk-connect-modal"
      isOpen={isOpen}
      onClose={onClose}
      closeOnEsc={eventConfig?.closeModalOnEsc}
      closeOnOverlayClick={eventConfig?.closeModalOnOverlayClick}
    >
      <Navbar showBack={showBack} onBack={back} onClose={onClose} />
      {view}
    </Modal>
  );
}
