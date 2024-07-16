import { Modal } from '@/base/components/Modal';
import { useWalletKit } from '@/components/WalletKitProvider/context';
import { useConnectModal } from './context';
import { useRouter } from './RouteProvider/context';
import { Navbar } from '@/components/Navbar';

export function ConnectModal() {
  const { options } = useWalletKit();
  const { isOpen, onClose } = useConnectModal();
  const { page, history, back } = useRouter();

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
      {page}
    </Modal>
  );
}
