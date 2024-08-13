import { useWalletKit } from '@/core/components/WalletKitProvider/context';
import { DataSource } from '@/ui/types';
import { useWallet } from '@solana/wallet-adapter-react';

export function useUIProviderConfig(): ReturnType<DataSource['useProvider']> {
  const { selectedWallet } = useWalletKit();
  const { connected } = useWallet();

  return {
    walletId: selectedWallet?.id,
    isConnected: connected,
  };
}
