import { useAccount } from '@/hooks/useAccount';
import { useBalance } from '@/hooks/useBalance';

import { DataSource } from '@node-real/walletkit-ui';

export function useAccountInfo(): ReturnType<DataSource['useAccount']> {
  const { address } = useAccount();
  const { balance } = useBalance();

  return { address, balance };
}
