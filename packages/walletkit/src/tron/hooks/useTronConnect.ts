import { useWalletKit } from '@/core/index';
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks';
import { useCallback, useState } from 'react';

export function useTronConnect() {
  const { select, wallets: adapters, connected, disconnect } = useWallet();

  const { log } = useWalletKit();
  const [isConnected, setIsConnected] = useState(connected);

  const connect = useCallback(
    async ({ adapterName, chainId }: { adapterName: string; chainId?: string | number }) => {
      select(adapterName as any);

      const finalChainId = typeof chainId === 'number' ? `0x${chainId.toString(16)}` : chainId;
      const adapter = adapters.find((item) => item.adapter.name === adapterName)?.adapter;

      if (adapter) {
        try {
          await adapter.connect();
          if (finalChainId) {
            await adapter?.switchChain(finalChainId);
          }
          setIsConnected(true);
        } catch (err) {
          setIsConnected(false);
          disconnect();
          log(err);
        }
      }
    },
    [adapters, disconnect, log, select],
  );

  return {
    connect,
    isConnected,
  };
}
