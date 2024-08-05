import { Modal } from '@/ui/base/components/Modal';
import { Navbar } from '@/ui/components/Navbar';
import { useConnectModal } from './context';
import { useRouter } from './RouteProvider/context';
import { useWalletKit } from '@/core/components/WalletKitProvider/context';

export function ConnectModal() {
  const { options } = useWalletKit();
  const { isOpen, onClose } = useConnectModal();
  const { view, history, back } = useRouter();

  const showBack = history.length > 1;

  return (
    <Modal
      className="wk-connect-modal"
      isOpen={isOpen}
      onClose={onClose}
      closeOnEsc={options.closeModalOnEsc}
      closeOnOverlayClick={options.closeModalOnOverlayClick}
    >
      <Navbar showBack={showBack} onBack={back} onClose={onClose} />
      {view}
    </Modal>
  );
}
