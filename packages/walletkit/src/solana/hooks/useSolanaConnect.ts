import { useWalletKit } from '@/core/providers/WalletKitProvider/context';
import { useWallet } from '@solana/wallet-adapter-react';
import { useCallback } from 'react';

export function useSolanaConnect() {
  const { solanaConfig } = useWalletKit();
  const { select, wallets: adapters, connected } = useWallet();

  const connect = useCallback(
    async ({ adapterName }: { adapterName: string; chainId?: string | number }) => {
      select(adapterName as any);

      if (!solanaConfig?.autoConnect) {
        const adapter = adapters.find((item) => item.adapter.name === adapterName)?.adapter;
        if (adapter) {
          await adapter.connect();
        }
      }
    },
    [adapters, select, solanaConfig?.autoConnect],
  );

  return {
    connect,
    isConnected: connected,
  };
}
