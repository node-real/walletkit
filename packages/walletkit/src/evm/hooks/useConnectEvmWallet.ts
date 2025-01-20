import { useWalletKit } from '@/core/providers/WalletKitProvider/context';
import { sleep } from '@/core/utils/common';
import { useEvmConnect, UseEvmConnectProps } from '@/evm/hooks/useEvmConnect';
import { useCallback } from 'react';
import { useConnectors, useDisconnect } from 'wagmi';

interface ConnectParams {
  walletId: string;
  chainId?: number;
  delay?: number;
  disconnectPreviousWallet?: boolean;
}

export function useConnectEvmWallet(props?: UseEvmConnectProps) {
  const { evmConfig } = useWalletKit();

  const connectors = useConnectors();
  const { connect, connectAsync } = useEvmConnect(props);
  const { disconnectAsync, reset, disconnect } = useDisconnect();

  const connectWalletAsync = useCallback(
    async (params: ConnectParams) => {
      const {
        walletId,
        chainId = evmConfig?.initialChainId,
        delay = 1000,
        disconnectPreviousWallet = true,
      } = params;

      const connector = connectors?.find((connector) => connector.id === walletId);
      if (connector) {
        if (disconnectPreviousWallet) {
          reset();
          await disconnectAsync();
        }
        await sleep(delay);
        await connectAsync({
          connector,
          chainId,
        });
      }
    },
    [connectAsync, connectors, disconnectAsync, evmConfig?.initialChainId, reset],
  );

  const connectWallet = useCallback(
    (params: ConnectParams) => {
      const {
        walletId,
        chainId = evmConfig?.initialChainId,
        delay = 1000,
        disconnectPreviousWallet = true,
      } = params;

      const connector = connectors?.find((connector) => connector.id === walletId);
      if (connector) {
        if (disconnectPreviousWallet) {
          reset();
          disconnect();
        }
        setTimeout(() => {
          connect({
            connector,
            chainId,
          });
        }, delay);
      }
    },
    [connect, connectors, disconnect, evmConfig?.initialChainId, reset],
  );

  return {
    connectWalletAsync,
    connectWallet,
  };
}
