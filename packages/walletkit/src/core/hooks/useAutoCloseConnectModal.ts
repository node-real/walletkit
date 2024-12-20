import { useEffect } from 'react';
import { ViewRoutes } from '../providers/RouteProvider';
import { useWalletKit } from '../providers/WalletKitProvider/context';
import { useConnectModal } from '../modals/ConnectModal/context';
import { useRouter } from '../providers/RouteProvider/context';

export function useAutoCloseConnectModal(isConnected: boolean, address: string | undefined | null) {
  const { options, selectedWallet } = useWalletKit();

  const router = useRouter();
  const { onClose } = useConnectModal();

  useEffect(() => {
    if (router.route !== ViewRoutes.HOME && isConnected) {
      options.onConnected?.({
        wallet: selectedWallet,
        address: address!,
      });

      if (options.closeModalAfterConnected) {
        onClose();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, router.route, options.closeModalAfterConnected]);
}
