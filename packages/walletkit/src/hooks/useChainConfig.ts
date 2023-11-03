import { Chain } from 'wagmi';
import { useWalletKitContext } from '..';
import { useMemo } from 'react';
import { ChainProps } from '../chains/types';

export function useChainConfig(chain?: Chain) {
  const { supportedChains } = useWalletKitContext();

  const config = useMemo(() => {
    const target = supportedChains.find((item) => item.id === chain?.id) ?? {};
    return target as ChainProps;
  }, [chain?.id, supportedChains]);

  return config;
}
