import { useEvmConnect, UseEvmConnectReturnType } from '@/evm/hooks/useEvmConnect';
import { useWalletKit } from '../../core/providers/WalletKitProvider/context';
import { useIsConnected } from './useIsConnected';

type ConnectOptions = Partial<Parameters<UseEvmConnectReturnType['connect']>[0]> & {
  walletId: string;
};

export function useConnectWallet() {
  const { log, evmConfig } = useWalletKit();

  const { connect, connectAsync, connectors } = useEvmConnect();
  const isConnected = useIsConnected();

  return {
    connect(options: ConnectOptions) {
      const { walletId, ...restOptions } = options;
      const wallet = evmConfig?.wallets.find((item) => item.id === walletId);

      if (!wallet) {
        log(`wallet not found, walletId: ${walletId}`);
      } else {
        const connector = connectors.find((item) => item.id === walletId);
        if (connector && wallet.isInstalled() && !isConnected)
          connect({
            connector,
            ...restOptions,
          });
      }
    },

    async connectAsync(options: ConnectOptions) {
      const { walletId, ...restOptions } = options;
      const wallet = evmConfig?.wallets.find((item) => item.id === walletId);

      if (!wallet) {
        log(`wallet not found, walletId: ${walletId}`);
      } else {
        const connector = connectors.find((item) => item.id === walletId);
        if (connector && wallet.isInstalled() && !isConnected)
          await connectAsync({
            connector,
            ...restOptions,
          });
      }
    },
  };
}
