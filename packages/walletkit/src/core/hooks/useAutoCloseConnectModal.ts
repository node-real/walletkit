import { useEffect } from 'react';
import { ViewRoutes } from '../modals/ConnectModal/RouteProvider';
import { useWalletKit } from '../providers/WalletKitProvider/context';
import { useConnectModal } from '../modals/ConnectModal/context';
import { useRouter } from '../modals/ConnectModal/RouteProvider/context';

export function useAutoCloseConnectModal(isConnected: boolean) {
  const { options } = useWalletKit();

  const router = useRouter();
  const { onClose } = useConnectModal();

  useEffect(() => {
    if (router.route !== ViewRoutes.HOME && isConnected && options.closeModalAfterConnected) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, router.route, options.closeModalAfterConnected]);
}
