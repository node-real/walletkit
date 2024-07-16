import { ChainProps } from '@/chains/types';
import { useWalletKit } from '@/components/WalletKitProvider/context';
import { useMemo } from 'react';
import { Chain } from 'viem';

export function useChainConfig(chain?: Chain) {
  const { chainsConfig } = useWalletKit();

  const config = useMemo(() => {
    const target = chainsConfig.find((item) => item.id === chain?.id) ?? {};
    return target as ChainProps;
  }, [chain?.id, chainsConfig]);

  return config;
}
