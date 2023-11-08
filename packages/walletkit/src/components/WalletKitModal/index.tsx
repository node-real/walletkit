import { useIsMounted } from '../../base/hooks/useIsMounted';
import { useRouter } from '../RouteProvider/context';
import { Modal } from '../../base/components/Modal';
import { useModal } from '../..';

export function WalletKitModal() {
  const { isOpen, onClose } = useModal();
  const { page } = useRouter();
  const isMounted = useIsMounted();
  const { isClosable } = useModal();

  if (!isMounted) return null;

  return (
    <Modal
      className="wk-connect-modal"
      isOpen={isOpen}
      onClose={onClose}
      closeOnEsc={isClosable}
      closeOnOverlayClick={isClosable}
    >
      {page}
    </Modal>
  );
}
