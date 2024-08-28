import { bitgetWalletConfig } from '@/core/configs/bitgetWallet';
import { EvmWallet, InjectedEvmWalletOptions } from '../types';
import { injected } from '../injected';
import { getEvmInjectedProvider } from '../utils';

export function bitgetWallet(props: InjectedEvmWalletOptions = {}): EvmWallet {
  const { connectorOptions, ...restProps } = props;

  return {
    ...bitgetWalletConfig,
    id: 'bitgetWallet',
    walletType: 'evm',
    showQRCode: false,
    useWalletConnect: false,
    isInstalled() {
      return !!getProvider();
    },
    getDeepLink() {
      return `https://bkcode.vip?action=dapp&url=${window.location.href}`;
    },
    getUri(uri) {
      return `https://bkcode.vip/wc?uri=${encodeURIComponent(uri)}`;
    },
    getCreateConnectorFn() {
      return injected({
        shimDisconnect: true,
        target: {
          id: bitgetWallet().id,
          name: bitgetWallet().name,
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
  return getEvmInjectedProvider('isBitEthereum') ?? window.bitkeep?.ethereum;
}
