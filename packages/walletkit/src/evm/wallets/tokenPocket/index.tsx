import { tokenPocketConfig } from '@/core/configs/tokenPocket';
import { injected } from '../injected';
import { InjectedEvmWalletOptions, EvmWallet } from '../types';
import { getEvmInjectedProvider } from '../utils';

export function tokenPocket(props: InjectedEvmWalletOptions = {}): EvmWallet {
  const { connectorOptions, ...restProps } = props;

  const getProvider = () => {
    if (typeof window === 'undefined') return;
    return (
      getEvmInjectedProvider('isTokenPocket') ?? window.tokenpocket?.ethereum ?? window.tokenpocket
    );
  };

  return {
    ...tokenPocketConfig,
    id: 'tokenPocket',
    walletType: 'evm',
    behaviors: [
      {
        platforms: ['browser-android', 'browser-ios', 'browser-pc'],
        connectType: 'default',
        isInstalled() {
          return !!getProvider();
        },
        getAppLink() {
          const params = {
            url: window.location.href,
          };
          return `tpdapp://open?params=${encodeURIComponent(JSON.stringify(params))}`;
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
      },
    ],
    ...restProps,
  };
}
