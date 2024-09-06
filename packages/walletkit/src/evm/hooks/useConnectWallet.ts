import { useEvmConnect } from '@/evm/hooks/useEvmConnect';
import { useWalletKit } from '../../core/providers/WalletKitProvider/context';

export function useConnectWallet() {
  const { log, evmConfig } = useWalletKit();

  const { connect, connectors } = useEvmConnect();

  return {
    connect(options: { walletId: string; initialChainId?: number }) {
      const { walletId, initialChainId } = options;
      const wallet = evmConfig?.wallets.find((item) => item.id === walletId);

      if (!wallet) {
        log(`wallet not found, walletId: ${walletId}`);
      } else {
        const connector = connectors.find((item) => item.id === walletId);
        if (connector && wallet.isInstalled())
          connect({
            connector,
            chainId: initialChainId,
          });
      }
    },
  };
}
