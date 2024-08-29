import { isMobile, isTMA } from '@/core/base/utils/mobile';
import { useWalletKit } from '@/core/providers/WalletKitProvider/context';
import { setEvmGlobalData } from '@/evm/globalData';
import { useWalletConnectUri } from '@/evm/hooks/useWalletConnectUri';

export function EvmHomeViewUriProvider() {
  const { evmConfig } = useWalletKit();

  const isEnabled =
    (!!evmConfig?.wallets.find((item) => item.useWalletConnect) || isTMA()) && isMobile();

  const { wcUri } = useWalletConnectUri({
    enabled: isEnabled,
    refreshUriOnError: false,
  });

  setEvmGlobalData({
    homeViewWalletConnectUri: wcUri,
  });

  return null;
}
