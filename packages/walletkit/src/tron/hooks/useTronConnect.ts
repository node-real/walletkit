import { isMobile } from '@/core/index';
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks';
import { useCallback, useState } from 'react';

export function useTronConnect() {
  const { select, wallets: adapters, connected } = useWallet();

  const [isConnected, setIsConnected] = useState(connected);

  const connect = useCallback(
    async ({ adapterName, chainId }: { adapterName: string; chainId?: string | number }) => {
      select(adapterName as any);

      const finalChainId = typeof chainId === 'number' ? `0x${chainId.toString(16)}` : chainId;
      const adapter = adapters.find((item) => item.adapter.name === adapterName)?.adapter;

      if (adapter) {
        await adapter.connect();
        setIsConnected(true);

        if (finalChainId && !isMobile()) {
          await adapter?.switchChain(finalChainId);
        }
      }
    },
    [adapters, select],
  );

  return {
    connect,
    isConnected,
  };
}
