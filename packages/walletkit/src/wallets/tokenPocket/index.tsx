import { Chain } from 'wagmi';

import { WalletProps } from '../types';
import { TokenPocketIcon } from './icon';
import { getInjectedProvider, hasInjectedProvider } from '../utils';
import { CustomConnector } from '../custom/connector';
import { PartialCustomProps } from '../custom';

export const TOKEN_POCKET_ID = 'tokenPocket';

export function tokenPocket(props: PartialCustomProps = {}): WalletProps {
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
      return new CustomConnector({
        id: TOKEN_POCKET_ID,
        chains,
        options: {
          name: 'TokenPocket',
          shimDisconnect: true,
          getProvider() {
            if (typeof window === 'undefined') return;

            const provider = getInjectedProvider('isTokenPocket') ?? window.tokenpocket;
            return provider;
          },
          ...connectorOptions,
        },
      });
    },
    getUri: () => {
      const params = {
        url: window.location.href,
      };
      return `tpdapp://open?params=${encodeURIComponent(JSON.stringify(params))}`;
    },
    ...restProps,
  };
}

export function isTokenPocket() {
  if (typeof window === 'undefined') return false;

  return !!(hasInjectedProvider('isTokenPocket') || window.tokenpocket);
}
