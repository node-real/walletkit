import { useWalletKit } from '@/components/WalletKitProvider/context';
import { DataSource } from '@node-real/walletkit-ui';
import { useWallet } from '@solana/wallet-adapter-react';

export function useProviderConfig(): ReturnType<DataSource['useProvider']> {
  const { selectedWallet } = useWalletKit();
  const { connected } = useWallet();

  return {
    walletId: selectedWallet?.id,
    isConnected: connected,
  };
}
