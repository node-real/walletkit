import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from 'wagmi';

import { PartialWalletProps, WalletProps } from '../types';
import { InjectedIcon } from './icon';

export const INJECTED_ID = 'injected';

export type InjectedConnectorOptions = Required<
  ConstructorParameters<typeof InjectedConnector>
>[0]['options'];

export interface InjectedProps extends PartialWalletProps {
  connectorOptions?: InjectedConnectorOptions;
}

export function injected(props: InjectedProps = {}): WalletProps {
  const { connectorOptions, ...restProps } = props;

  return {
    id: INJECTED_ID,
    name: 'Browser Wallet',
    logos: {
      default: <InjectedIcon />,
    },
    downloadUrls: {
      default: undefined,
    },
    installed: isInjected(),
    createConnector: (chains: Chain[]) => {
      return new InjectedConnector({
        chains,
        options: {
          name: 'Browser Wallet',
          shimDisconnect: true,
          ...connectorOptions,
        },
      });
    },
    getUri: () => undefined,
    ...restProps,
  };
}

export function isInjected() {
  return typeof window !== 'undefined' && Boolean(window.ethereum);
}
