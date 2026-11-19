import { Modal } from '@/core/base/components/Modal';
import { useWalletKit } from '@/core/providers/WalletKitProvider/context';
import { useRouter } from '../../providers/RouteProvider/context';
import { useConnectModal } from './context';
import { Navbar } from '@/core/components/Navbar';
import { ViewRoutes } from '../../providers/RouteProvider';
import { IOSSecurityNotice } from './IOSSecurityNotice';

export function ConnectModal() {
  const { options } = useWalletKit();
  const { isOpen, onClose, iosRisk, acknowledgeIOSRisk } = useConnectModal();
  const { view, history, back, route } = useRouter();

  const showBack = history.length > 1;

  return (
    <Modal
      className="wk-connect-modal"
      isOpen={isOpen}
      onClose={onClose}
      closeOnEsc={options?.closeModalOnEsc}
      closeOnOverlayClick={options?.closeModalOnOverlayClick}
    >
      <Navbar showBack={showBack} onBack={back} onClose={onClose} />
      {route === ViewRoutes.HOME && iosRisk ? (
        <IOSSecurityNotice risk={iosRisk} onContinue={acknowledgeIOSRisk} onCancel={onClose} />
      ) : (
        view
      )}
    </Modal>
  );
}
