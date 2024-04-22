import { ChainProps } from '@/chains/types';
import { useWalletKitContext } from '@/components/WalletKitProvider/context';
import { useMemo } from 'react';
import { Chain } from 'wagmi';

export function useChainConfig(chain?: Chain) {
  const { supportedChains } = useWalletKitContext();

  const config = useMemo(() => {
    const target = supportedChains.find((item) => item.id === chain?.id) ?? {};
    return target as ChainProps;
  }, [chain?.id, supportedChains]);

  return config;
}
