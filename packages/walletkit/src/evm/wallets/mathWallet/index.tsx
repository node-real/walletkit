import { mathWalletConfig } from '@/core/configs/mathWallet';
import { EvmWallet, InjectedEvmWalletOptions } from '../types';
import { injected } from '../injected';
import { getEvmInjectedProvider } from '../../utils/getEvmInjectedProvider';

export function mathWallet(props: InjectedEvmWalletOptions = {}): EvmWallet {
  const { connectorOptions, ...restProps } = props;

  const getProvider = () => {
    if (typeof window === 'undefined') return;
    return getEvmInjectedProvider('isMathWallet');
  };

  return {
    ...mathWalletConfig,
    id: 'mathWallet',
    walletType: 'evm',
    spinnerColor: undefined,
    behaviors: [
      {
        platforms: ['browser-android', 'browser-ios', 'browser-pc'],
        connectType: 'default',
        isInstalled() {
          return !!getProvider();
        },
        getCreateConnectorFn() {
          return injected({
            shimDisconnect: true,
            target: {
              id: mathWallet().id,
              name: mathWallet().name,
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
