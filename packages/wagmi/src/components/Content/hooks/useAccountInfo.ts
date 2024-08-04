import { useWalletKitBalance } from '@/hooks/useWalletKitBalance';
import { DataSource } from '@node-real/walletkit-ui';
import { useAccount } from 'wagmi';

export function useAccountInfo(): ReturnType<DataSource['useAccount']> {
  const { address } = useAccount();
  const { balance } = useWalletKitBalance(address);

  return { address, balance };
}
