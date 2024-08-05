import { useChainIsSupported } from '@/core/hooks/useChainIsSupported';
import { DataSource } from '@/ui/types';
import { useAccount } from 'wagmi';

export function useUIChainInfo(): ReturnType<DataSource['useChain']> {
  const { chain } = useAccount();
  const isSupported = useChainIsSupported();

  return {
    chain,
    isSupported,
  };
}
