import { useChainConfig } from '@/core/hooks/useChainConfig';
import { DataSource } from '@/ui/types';
import { useAccount } from 'wagmi';

export function useUIConnectedButton(): ReturnType<DataSource['useConnectedButton']> {
  const { chain } = useAccount();
  const chainInfo = useChainConfig(chain);

  return {
    chainName: chainInfo.name,
    chainLogo: chainInfo.logo,
  };
}
