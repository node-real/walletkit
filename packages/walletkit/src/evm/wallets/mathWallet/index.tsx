import { mathWalletConfig } from '@/core/configs/mathWallet';
import { EvmWallet, InjectedEvmWalletOptions } from '../types';
import { injected } from '../injected';
import { getInjectedEvmProvider, hasInjectedEvmProvider } from '../utils';

export function mathWallet(props: InjectedEvmWalletOptions = {}): EvmWallet {
  const { connectorOptions, ...restProps } = props;

  return {
    ...mathWalletConfig,
    id: 'mathWallet',
    walletType: 'evm',
    spinnerColor: undefined,
    isInstalled() {
      if (typeof window === 'undefined') return false;

      return hasInjectedEvmProvider('isMathWallet');
    },
    getDeepLink() {
      // return `mathwallet://mathwallet.org?action=link&value=${window.location.href}`;
      // return `mathwallet://wc?uri=${encodeURIComponent(uri)}`;
      return undefined;
    },
    getQRCodeUri(uri) {
      return uri;
    },
    getCreateConnectorFn() {
      return injected({
        shimDisconnect: true,
        target: {
          id: mathWallet().id,
          name: mathWallet().name,
          async provider() {
            if (typeof window === 'undefined') return;

            const provider = getInjectedEvmProvider('isMathWallet');
            return provider;
          },
        },
        ...connectorOptions,
      });
    },
    ...restProps,
  };
}
