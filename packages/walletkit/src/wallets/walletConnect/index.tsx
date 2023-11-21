import { getGlobalData } from '@/globalData';
import { isMobile } from '@/index';
import { Chain, Connector } from 'wagmi';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { PartialWalletProps, WalletProps } from '..';
import { WalletConnectIcon, WalletConnectTransparentIcon } from './icon';

export const WALLET_CONNECT_ID = 'walletConnect';

export type WalletConnectConnectorOptions = Partial<
  Required<ConstructorParameters<typeof WalletConnectConnector>>[0]['options']
>;

export interface WalletConnectProps extends PartialWalletProps {
  connectorOptions?: WalletConnectConnectorOptions;
}

export function walletConnect(props: WalletConnectProps = {}): WalletProps {
  const { connectorOptions, ...restProps } = props;

  return {
    id: WALLET_CONNECT_ID,
    name: 'WalletConnect',
    logos: {
      default: <WalletConnectIcon />,
      transparent: <WalletConnectTransparentIcon />,
    },
    downloadUrls: {
      default: undefined,
    },
    installed: undefined,
    createConnector: (chains: Chain[]) => {
      const { walletConnectDefaultOptions } = getGlobalData();
      const { walletConnectProjectId, appName, appIcon, appDescription, appUrl } =
        walletConnectDefaultOptions;

      const hasAllAppData = appName && appIcon && appDescription && appUrl;

      if (!walletConnectProjectId) {
        throw new Error('walletConnectProjectId is required.');
      }

      return new WalletConnectConnector({
        chains,
        options: {
          showQrModal: isMobile() ? true : false,
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
        },
      });
    },
    getUri: () => undefined,
    ...restProps,
  };
}

export function isWalletConnectConnector(connector?: Connector) {
  return connector?.id === WALLET_CONNECT_ID;
}
