import { getGlobalData } from '@/globalData';
import { isMobile } from '@/index';
import { WalletProps } from '..';
import { WalletConnectIcon, WalletConnectTransparentIcon } from './icon';
import { walletConnect as wagmiWalletConnect, WalletConnectParameters } from 'wagmi/connectors';
import { Connector } from 'wagmi';

const WALLET_CONNECT_ID = 'walletConnect';
const WALLET_CONNECT_NAME = 'WalletConnect';

export interface WalletConnectOptions extends Partial<WalletProps> {
  connectorOptions?: Partial<WalletConnectParameters>;
}

export function walletConnect(props: WalletConnectOptions = {}): WalletProps {
  const { connectorOptions, ...restProps } = props;

  return {
    id: WALLET_CONNECT_ID,
    name: WALLET_CONNECT_NAME,
    logos: {
      default: <WalletConnectIcon />,
      transparent: <WalletConnectTransparentIcon />,
    },
    downloadUrls: {
      default: undefined,
    },
    showQRCode: isMobile() ? false : !connectorOptions?.showQrModal,
    isInstalled: () => false,
    getDeepLink: () => undefined,
    getCreateConnectorFn: () => {
      const { walletConnectProjectId, appName, appIcon, appDescription, appUrl } = getGlobalData();

      const hasAllAppData = appName && appIcon && appDescription && appUrl;

      if (!walletConnectProjectId) {
        throw new Error('walletConnectProjectId is required.');
      }

      return wagmiWalletConnect({
        // https://github.com/WalletConnect/walletconnect-monorepo/issues/2830
        relayUrl: 'wss://relay.walletconnect.org',
        projectId: walletConnectProjectId,
        metadata: hasAllAppData
          ? {
              name: appName,
              description: appDescription!,
              url: appUrl!,
              icons: [appIcon!],
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

export function isWalletConnectConnector(connector: Connector) {
  return connector.id === WALLET_CONNECT_ID;
}
