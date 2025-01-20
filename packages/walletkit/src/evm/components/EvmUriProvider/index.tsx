import { isMobile, isTMA } from '@/core/index';
import { setEvmGlobalData } from '@/evm/globalData';
import { useWalletConnectUri } from '@/evm/hooks/useWalletConnectUri';

export function EvmUriProvider() {
  const enabled = isTMA() && isMobile();

  const { wcUri } = useWalletConnectUri({
    enabled,
  });

  setEvmGlobalData({
    globalWcUri: wcUri,
  });

  return null;
}
