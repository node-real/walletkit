import { Chain, Connector } from 'wagmi';

import { PartialWalletProps, WalletProps } from '../types';
import { WalletConnectIcon } from './icon';
import { getGlobalData } from '../../globalData';

import { WalletConnectConnector } from '../walletConnect/connector';

export const WALLET_CONNECT_ID = 'walletConnect';

export type WalletConnectConnectorOptions = Required<
  ConstructorParameters<typeof WalletConnectConnector>
>[0]['options'];

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
          showQrModal: true,
          projectId: walletConnectProjectId,
          metadata: hasAllAppData
            ? {
                name: appName,
                description: appDescription!,
                url: appUrl!,
                icons: [appIcon!],
              }
            : undefined,
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
