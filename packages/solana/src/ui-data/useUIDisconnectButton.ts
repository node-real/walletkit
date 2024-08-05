import { DataSource } from '@/ui/types';
import { useWallet } from '@solana/wallet-adapter-react';

export function useUIDisconnectButton(): ReturnType<DataSource['useDisconnectButton']> {
  const { disconnect } = useWallet();

  return {
    onClick() {
      disconnect();
    },
  };
}
