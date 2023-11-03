import { Chain, Connector } from 'wagmi';

import { PartialWalletProps, WalletProps } from '../types';
import { TokenPocketIcon } from './icon';
import { TokenPocketConnector, TokenPocketConnectorOptions } from '../tokenPocket/connector';

export const TOKEN_POCKET_ID = 'tokenPocket';

export interface TokenPocketProps extends PartialWalletProps {
  connectorOptions?: TokenPocketConnectorOptions;
}

export function tokenPocket(props: TokenPocketProps = {}): WalletProps {
  const { connectorOptions, ...restProps } = props;

  return {
    id: TOKEN_POCKET_ID,
    name: 'TokenPocket',
    logos: {
      default: <TokenPocketIcon />,
    },
    downloadUrls: {
      default: 'https://www.tokenpocket.pro/en/download/app',
    },
    spinnerColor: '#2980FE',
    installed: isTokenPocket(),
    createConnector: (chains: Chain[]) => {
      return new TokenPocketConnector({
        chains,
        options: {
          shimDisconnect: true,
          ...connectorOptions,
        },
      });
    },
    getUri: () => {
      const tpParams = {
        url: window.location.href,
      };
      return `tpdapp://open?params=${encodeURIComponent(JSON.stringify(tpParams))}`;
    },
    ...restProps,
  };
}

export function isTokenPocket() {
  if (typeof window === 'undefined') return false;
  return window?.ethereum?.isTokenPocket ?? !!window.tokenpocket;
}

export function isTokenPocketConnector(connector?: Connector) {
  return connector?.id === TOKEN_POCKET_ID;
}
