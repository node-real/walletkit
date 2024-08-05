import { useAccount } from 'wagmi';
import { useWalletKitBalance } from '@/core/hooks/useWalletKitBalance';
import { DataSource } from '@/ui/types';

export function useUIAccountInfo(): ReturnType<DataSource['useAccount']> {
  const { address } = useAccount();
  const { balance } = useWalletKitBalance(address);

  return { address, balance };
}
