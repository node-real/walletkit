import { SafeConnector } from 'wagmi/connectors/safe';
import { Chain } from 'wagmi';

import { Connector } from 'wagmi/connectors';
import { PartialWalletProps, WalletProps } from '..';
import { InjectedIcon } from '../injected/icon';

export const SAFE_ID = 'safe';

export type SafeConnectorOptions = Required<
  ConstructorParameters<typeof SafeConnector>
>[0]['options'];

export interface SafeProps extends PartialWalletProps {
  connectorOptions?: SafeConnectorOptions;
}

export function safe(props: SafeProps = {}): WalletProps {
  const { connectorOptions, ...restProps } = props;

  return {
    id: SAFE_ID,
    name: 'Safe Wallet',
    logos: {
      default: <InjectedIcon />,
    },
    downloadUrls: {
      default: undefined,
    },
    showQRCode: false,
    isInstalled: isSafe,
    createConnector: (chains: Chain[]) => {
      return new SafeConnector({
        chains,
        options: {
          allowedDomains: [/gnosis-safe.io$/, /app.safe.global$/],
          debug: false,
          ...connectorOptions,
        },
      });
    },
    getDeepLink: () => undefined,
    ...restProps,
  };
}

export function isSafe() {
  return !(typeof window === 'undefined') && window?.parent !== window;
}

export function isSafeConnector(connector?: Connector) {
  return connector?.id === SAFE_ID;
}
