import { tokenPocketConfig } from '@/core/configs/wallets/tokenPocket';
import { injected } from '../injected';
import { InjectedEvmWalletOptions, EvmWallet } from '../types';
import { getInjectedEvmProvider, hasInjectedEvmProvider } from '../utils';

export function tokenPocket(props: InjectedEvmWalletOptions = {}): EvmWallet {
  const { connectorOptions, ...restProps } = props;

  return {
    ...tokenPocketConfig,
    showQRCode: false,
    isInstalled: () => {
      if (typeof window === 'undefined') return false;

      return (
        hasInjectedEvmProvider('isTokenPocket') ||
        window.tokenpocket?.ethereum ||
        window.tokenpocket
      );
    },
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
          id: tokenPocketConfig.id,
          name: tokenPocketConfig.name,
          async provider() {
            const provider =
              getInjectedEvmProvider('isTokenPocket') ??
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
