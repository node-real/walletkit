import { DataSource } from '@node-real/walletkit-ui';
import { useWallet } from '@solana/wallet-adapter-react';

export function useDisconnectButton(): ReturnType<DataSource['useDisconnectButton']> {
  const { disconnect } = useWallet();

  return {
    onClick() {
      disconnect();
    },
  };
}
