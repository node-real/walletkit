import { setEvmGlobalData } from '@/evm/globalData';
import { useWalletConnectUri } from '@/evm/hooks/useWalletConnectUri';

export function EvmHomeViewWalletConnectUriProvider() {
  const { wcUri } = useWalletConnectUri({
    refreshUriOnError: false,
  });

  setEvmGlobalData({
    homeViewWalletConnectUri: wcUri,
  });

  return null;
}
