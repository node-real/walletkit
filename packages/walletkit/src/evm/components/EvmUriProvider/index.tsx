import { useWalletKit } from '@/core/index';
import { getWalletBehaviorOnPlatform } from '@/core/utils/common';
import { setEvmGlobalData } from '@/evm/globalData';
import { useWalletConnectUri } from '@/evm/hooks/useWalletConnectUri';
import { EvmWalletBehavior } from '@/evm/wallets';
import { useMemo } from 'react';

export function EvmUriProvider() {
  const { wallets } = useWalletKit();
  const enabled = useMemo(() => {
    return wallets.some(
      (e) => getWalletBehaviorOnPlatform<EvmWalletBehavior>(e)?.connectType === 'uri',
    );
  }, [wallets]);

  const { wcUri } = useWalletConnectUri({
    enabled,
  });

  setEvmGlobalData({
    globalWcUri: wcUri,
  });

  return null;
}
