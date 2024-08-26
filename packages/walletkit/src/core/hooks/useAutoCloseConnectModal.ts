import { useEffect } from 'react';
import { ViewRoutes } from '../modals/ConnectModal/RouteProvider';
import { useEventConfig } from '../providers/WalletKitProvider/context';
import { useConnectModal } from '../modals/ConnectModal/context';
import { useRouter } from '../modals/ConnectModal/RouteProvider/context';

export function useAutoCloseConnectModal(isConnected: boolean) {
  const eventConfig = useEventConfig();

  const router = useRouter();
  const { onClose } = useConnectModal();

  useEffect(() => {
    if (
      router.route !== ViewRoutes.CONNECTORS &&
      isConnected &&
      eventConfig.closeModalAfterConnected
    ) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, router.route, eventConfig.closeModalAfterConnected]);
}
