import { ChainConfig } from '@/ui/index';
import { useMemo } from 'react';
import { Chain } from 'viem';
import { useWalletKit } from '../components/WalletKitProvider/context';

export function useChainConfig(chain?: Chain) {
  const { chainsConfig } = useWalletKit();

  const config = useMemo(() => {
    const target = chainsConfig.find((item) => item.id === chain?.id) ?? {};
    return target as ChainConfig;
  }, [chain?.id, chainsConfig]);

  return config;
}
