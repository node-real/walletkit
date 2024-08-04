import { DataSource } from '@node-real/walletkit-ui';

export function useChainInfo(): ReturnType<DataSource['useChain']> {
  return {
    chain: null,
    isSupported: true,
  };
}
