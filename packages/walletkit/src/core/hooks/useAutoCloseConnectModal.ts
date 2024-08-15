import { useEffect } from 'react';
import { ViewRoutes } from '../modals/ConnectModal/RouteProvider';
import { useConfig } from '../providers/WalletKitProvider/context';
import { useConnectModal } from '../modals/ConnectModal/context';
import { useRouter } from '../modals/ConnectModal/RouteProvider/context';

export function useAutoCloseConnectModal(isConnected: boolean) {
  const { events } = useConfig();

  const router = useRouter();
  const { onClose } = useConnectModal();

  useEffect(() => {
    if (router.route !== ViewRoutes.CONNECTORS && isConnected && events.closeModalAfterConnected) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, router.route, events.closeModalAfterConnected]);
}
