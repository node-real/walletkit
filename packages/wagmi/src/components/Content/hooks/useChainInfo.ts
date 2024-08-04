import { useChainIsSupported } from '@/hooks/useChainIsSupported';
import { DataSource } from '@node-real/walletkit-ui';
import { useAccount } from 'wagmi';

export function useChainInfo(): ReturnType<DataSource['useChain']> {
  const { chain } = useAccount();
  const isSupported = useChainIsSupported();

  return {
    chain,
    isSupported,
  };
}
