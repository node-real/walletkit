import { useIsMounted } from '../../hooks/useIsMounted';
import { useRouter } from '../RouteProvider/context';
import { useWalletKitContext } from '../WalletKitProvider/context';
import { Modal } from '../base/Modal';

export function WalletKitModal() {
  const { isOpen, onClose } = useWalletKitContext();
  const { page } = useRouter();
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  return (
    <Modal className="wk-walletkit-modal" isOpen={isOpen} onClose={onClose}>
      {page}
    </Modal>
  );
}
