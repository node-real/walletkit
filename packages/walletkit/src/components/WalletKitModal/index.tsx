import { Modal } from '@/base/components/Modal';
import { useRouter } from '../RouteProvider/context';
import { useWalletKitModal } from './WalletKitModalProvider/context';
import { useWalletKitContext } from '../WalletKitProvider/context';
import { Navbar } from '../Navbar';

export function WalletKitModal() {
  const { options } = useWalletKitContext();
  const { isOpen, onClose } = useWalletKitModal();

  const { page } = useRouter();

  return (
    <Modal
      className="wk-connect-modal"
      isOpen={isOpen}
      onClose={onClose}
      closeOnEsc={options.closeModalOnEsc}
      closeOnOverlayClick={options.closeModalOnOverlayClick}
    >
      <Navbar onClose={onClose} />
      {page}
    </Modal>
  );
}
