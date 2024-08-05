import { DataSource } from '@/ui/types';

export function useUIChainInfo(): ReturnType<DataSource['useChain']> {
  return {
    chain: null,
    isSupported: true,
  };
}
