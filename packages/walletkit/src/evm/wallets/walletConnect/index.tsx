import { getGlobalData } from '@/core/globalData';
import { WalletConnectParameters, walletConnect as wagmiWalletConnect } from 'wagmi/connectors';
import { EvmWallet } from '../types';
import { isMobile } from '@/core/base/utils/mobile';
import { walletConnectConfig } from '@/core/configs/wallets/walletConnect';

interface WalletConnectOptions extends Partial<EvmWallet> {
  connectorOptions?: Partial<WalletConnectParameters>;
}

export function walletConnect(props: WalletConnectOptions = {}): EvmWallet {
  const { connectorOptions, ...restProps } = props;

  return {
    ...walletConnectConfig,
    walletType: 'evm',
    showQRCode: isMobile() ? false : !connectorOptions?.showQrModal,
    isInstalled: () => false,
    getDeepLink: () => undefined,
    getCreateConnectorFn: () => {
      const { walletConnectProjectId, metadata } = getGlobalData();

      const hasAllAppData = metadata?.name && metadata.icon && metadata.description && metadata.url;

      if (!walletConnectProjectId) {
        throw new Error('walletConnectProjectId is required.');
      }

      return wagmiWalletConnect({
        // https://github.com/WalletConnect/walletconnect-monorepo/issues/2830
        relayUrl: 'wss://relay.walletconnect.org',
        projectId: walletConnectProjectId,
        metadata: hasAllAppData
          ? {
              name: metadata.name,
              description: metadata.description!,
              url: metadata.url!,
              icons: [metadata.icon!],
            }
          : undefined,
        qrModalOptions: {
          explorerRecommendedWalletIds: [
            '8a0ee50d1f22f6651afcae7eb4253e52a3310b90af5daef78a8c4929a9bb99d4',
            'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
            '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0',
          ],
        },
        ...connectorOptions,
        showQrModal: true,
      });
    },
    ...restProps,
  };
}