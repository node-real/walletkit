import { isMobile, isTMA } from '@/core/base/utils/mobile';
import { useWalletKit } from '@/core/providers/WalletKitProvider/context';
import { setEvmGlobalData } from '@/evm/globalData';
import { useWalletConnectUri } from '@/evm/hooks/useWalletConnectUri';

export function EvmConnectorUriProvider() {
  const { wallets } = useWalletKit();

  const isWcUriEnabled = (!!wallets.find((item) => item.useWalletConnect) || isTMA()) && isMobile();
  const { wcUri } = useWalletConnectUri({
    enabled: isWcUriEnabled,
  });

  setEvmGlobalData({
    walletConnectUri: wcUri,
  });

  return null;
}
