import { mathWalletConfig } from '@/core/configs/mathWallet';
import { EvmWallet, InjectedEvmWalletOptions } from '../types';
import { injected } from '../injected';
import { getEvmInjectedProvider } from '../utils';

export function mathWallet(props: InjectedEvmWalletOptions = {}): EvmWallet {
  const { connectorOptions, ...restProps } = props;

  return {
    ...mathWalletConfig,
    id: 'mathWallet',
    walletType: 'evm',
    spinnerColor: undefined,
    useWalletConnect: false,
    isInstalled() {
      return !!getProvider();
    },
    getDeepLink() {
      // return `mathwallet://mathwallet.org?action=link&value=${window.location.href}`;
      // return `mathwallet://wc?uri=${encodeURIComponent(uri)}`;
      return undefined;
    },
    getUri(uri) {
      return uri;
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
    ...restProps,
  };
}

function getProvider() {
  if (typeof window === 'undefined') return;
  return getEvmInjectedProvider('isMathWallet');
}
