import { useAccount } from '@/core/hooks/useAccount';
import { useBalance } from '@/core/hooks/useBalance';
import { DataSource } from '@/ui/types';

export function useUIAccountInfo(): ReturnType<DataSource['useAccount']> {
  const { address } = useAccount();
  const { balance } = useBalance();

  return { address, balance };
}
