import { isMobile, isTMA } from '@/core/base/utils/mobile';
import { useEvmConfig } from '@/core/providers/WalletKitProvider/context';
import { setEvmGlobalData } from '@/evm/globalData';
import { useEvmWalletConnectUri } from '@/evm/hooks/useEvmWalletConnectUri';

export function EvmConnectorUriProvider() {
  const { wallets } = useEvmConfig();

  const isWcUriEnabled = (!!wallets.find((item) => item.useWalletConnect) || isTMA()) && isMobile();
  const { wcUri } = useEvmWalletConnectUri({
    enabled: isWcUriEnabled,
  });

  setEvmGlobalData({
    walletConnectUri: wcUri,
  });

  return null;
}
