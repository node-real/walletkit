import { TokenPocketIcon, TokenPocketTransparentIcon } from '@node-real/walletkit-ui';
import { injected } from '../injected';
import { InjectedWalletOptions, WalletProps } from '../types';
import { getInjectedProvider, hasInjectedProvider } from '../utils';

const TOKEN_POCKET_ID = 'tokenPocket';
const TOKEN_POCKET_NAME = 'TokenPocket';

export function tokenPocket(props: InjectedWalletOptions = {}): WalletProps {
  const { connectorOptions, ...restProps } = props;

  return {
    id: TOKEN_POCKET_ID,
    name: TOKEN_POCKET_NAME,
    logos: {
      default: <TokenPocketIcon />,
      transparent: <TokenPocketTransparentIcon />,
    },
    downloadUrls: {
      default: 'https://www.tokenpocket.pro/en/download/app',
    },
    spinnerColor: '#2980FE',
    showQRCode: false,
    isInstalled: hasInjectedTokenPocket,
    getDeepLink: () => {
      const params = {
        url: window.location.href,
      };
      return `tpdapp://open?params=${encodeURIComponent(JSON.stringify(params))}`;
    },
    getQRCodeUri: (uri) => {
      return `tpoutside://wc?uri=${encodeURIComponent(uri)}`;
    },
    getCreateConnectorFn: () => {
      return injected({
        shimDisconnect: true,
        target: {
          id: TOKEN_POCKET_ID,
          name: TOKEN_POCKET_NAME,
          async provider() {
            const provider =
              getInjectedProvider('isTokenPocket') ??
              window.tokenpocket?.ethereum ??
              window.tokenpocket;

            return provider;
          },
        },
        ...connectorOptions,
      });
    },
    ...restProps,
  };
}

export function hasInjectedTokenPocket() {
  if (typeof window === 'undefined') return false;

  return hasInjectedProvider('isTokenPocket') || window.tokenpocket?.ethereum || window.tokenpocket;
}
