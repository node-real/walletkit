import { Modal } from '@/base/components/Modal';
import { useConnectModal } from './context';
import { useRouter } from './RouteProvider/context';
import { Navbar } from '@/components/Navbar';
import { useDataSource } from '@/components/DataSourceProvider/context';

export function ConnectModal() {
  const { options } = useDataSource();
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
