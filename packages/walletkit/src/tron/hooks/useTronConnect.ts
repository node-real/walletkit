import { useWalletKit } from '@/core/index';
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks';
import { useCallback } from 'react';

export function useTronConnect() {
  const { tronConfig } = useWalletKit();
  const { select, wallets: adapters } = useWallet();

  const connect = useCallback(
    async ({ adapterName }: { adapterName: string }) => {
      select(adapterName as any);
      if (!tronConfig?.autoConnect) {
        const adapter = adapters.find((item) => item.adapter.name === adapterName)?.adapter;
        if (adapter) {
          await adapter.connect();
        }
      }
    },
    [adapters, select, tronConfig?.autoConnect],
  );

  return {
    connect,
  };
}
