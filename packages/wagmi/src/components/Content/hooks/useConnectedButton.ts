import { useChainConfig } from '@/hooks/useChainConfig';
import { DataSource } from '@node-real/walletkit-ui';
import { useAccount } from 'wagmi';

export function useConnectedButton(): ReturnType<DataSource['useConnectedButton']> {
  const { chain } = useAccount();
  const chainInfo = useChainConfig(chain);

  return {
    chainName: chainInfo.name,
    chainLogo: chainInfo.logo,
  };
}
