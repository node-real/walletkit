import { useConnectModal } from '../modals/ConnectModal/context';
import { useSwitchNetworkModal } from '../modals/SwitchNetworkModal/SwitchNetworkProvider/context';

export function useCloseAllModals() {
  const connectModal = useConnectModal();
  const switchNetworkModal = useSwitchNetworkModal();
  // const profileModal = useProfileModal();

  return {
    onCloseAllModals() {
      connectModal.onClose();
      switchNetworkModal.onClose();
      // profileModal.onClose();
    },
  };
}
