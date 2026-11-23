import { Modal } from '@/base/components/Modal';
import { useRouter } from '../RouteProvider/context';
import { useWalletKitModal } from './WalletKitModalProvider/context';
import { useWalletKitContext } from '../WalletKitProvider/context';
import { Navbar } from '../Navbar';
import { routes } from '../RouteProvider';
import { IOSSecurityNotice } from './IOSSecurityNotice';

export function WalletKitModal() {
  const { options } = useWalletKitContext();
  const { isOpen, onClose, iosRisk, acknowledgeIOSRisk } = useWalletKitModal();

  const { route, page } = useRouter();

  return (
    <Modal
      className="wk-connect-modal"
      isOpen={isOpen}
      onClose={onClose}
      closeOnEsc={options.closeModalOnEsc}
      closeOnOverlayClick={options.closeModalOnOverlayClick}
    >
      <Navbar onClose={onClose} />
      {route === routes.CONNECTORS && iosRisk !== null
        ? iosRisk && (
            <IOSSecurityNotice risk={iosRisk} onContinue={acknowledgeIOSRisk} onCancel={onClose} />
          )
        : page}
    </Modal>
  );
}
