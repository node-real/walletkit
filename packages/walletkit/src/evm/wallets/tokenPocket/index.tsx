import { tokenPocketConfig } from '@/core/configs/tokenPocket';
import { injected } from '../injected';
import { InjectedEvmWalletOptions, EvmWallet } from '../types';
import { getEvmInjectedProvider } from '../utils';

export function tokenPocket(props: InjectedEvmWalletOptions = {}): EvmWallet {
  const { connectorOptions, ...restProps } = props;

  return {
    ...tokenPocketConfig,
    id: 'tokenPocket',
    walletType: 'evm',
    showQRCode: false,
    useWalletConnect: false,
    isInstalled() {
      return !!getProvider();
    },
    getDeepLink() {
      const params = {
        url: window.location.href,
      };
      return `tpdapp://open?params=${encodeURIComponent(JSON.stringify(params))}`;
    },
    getUri(uri) {
      return `tpoutside://wc?uri=${encodeURIComponent(uri)}`;
    },
    getCreateConnectorFn() {
      return injected({
        shimDisconnect: true,
        target: {
          id: tokenPocket().id,
          name: tokenPocket().name,
          async provider() {
            return getProvider();
          },
        },
        ...connectorOptions,
      });
    },
    ...restProps,
  };
}

function getProvider() {
  if (typeof window === 'undefined') return;
  return (
    getEvmInjectedProvider('isTokenPocket') ?? window.tokenpocket?.ethereum ?? window.tokenpocket
  );
}
