import { okxWalletConfig } from '@/core/configs/okxWallet';
import { injected } from '../injected';
import { EvmWallet, InjectedEvmWalletOptions } from '../types';
import { getEvmInjectedProvider } from '../../utils/getEvmInjectedProvider';

export function okxWallet(props: InjectedEvmWalletOptions = {}): EvmWallet {
  const { connectorOptions, ...restProps } = props;

  const getProvider = () => {
    if (typeof window === 'undefined') return;
    return getEvmInjectedProvider('isOkxWallet') ?? window.okexchain;
  };

  return {
    ...okxWalletConfig,
    id: 'okxWallet',
    walletType: 'evm',
    behaviors: [
      {
        platforms: ['browser-android', 'browser-ios', 'browser-pc'],
        connectType: 'default',
        isInstalled() {
          return !!getProvider();
        },
        getAppLink() {
          return `okx://wallet/dapp/details?dappUrl=${window.location.href}`;
        },
        getCreateConnectorFn() {
          return injected({
            shimDisconnect: true,
            target: {
              id: okxWallet().id,
              name: okxWallet().name,
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
