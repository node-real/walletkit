import { okxWalletConfig } from '@/core/configs/okxWallet';
import { injected } from '../injected';
import { EvmWallet, InjectedEvmWalletOptions } from '../types';
import { getEvmInjectedProvider } from '../utils';

export function okxWallet(props: InjectedEvmWalletOptions = {}): EvmWallet {
  const { connectorOptions, ...restProps } = props;

  return {
    ...okxWalletConfig,
    id: 'okxWallet',
    walletType: 'evm',
    showQRCode: false,
    isInstalled() {
      return !!getProvider();
    },
    getDeepLink() {
      return `okx://wallet/dapp/details?dappUrl=${window.location.href}`;
    },
    getUri(uri) {
      return `okex://main/wc?uri=${encodeURIComponent(uri)}`;
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
    ...restProps,
  };
}

function getProvider() {
  if (typeof window === 'undefined') return;
  return getEvmInjectedProvider('isOkxWallet') ?? window.okexchain;
}
