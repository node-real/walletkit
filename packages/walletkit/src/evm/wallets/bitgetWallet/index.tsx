import { bitgetWalletConfig } from '@/core/configs/bitgetWallet';
import { EvmWallet, InjectedEvmWalletOptions } from '../types';
import { injected } from '../injected';
import { isMobile } from '@/core/base/utils/mobile';
import { getInjectedEvmProvider, hasInjectedEvmProvider } from '../utils';

export function bitgetWallet(props: InjectedEvmWalletOptions = {}): EvmWallet {
  const { connectorOptions, ...restProps } = props;

  return {
    ...bitgetWalletConfig,
    id: 'bitgetWallet',
    walletType: 'evm',
    showQRCode: false,
    isInstalled() {
      if (typeof window === 'undefined') return false;

      if (isMobile()) {
        return !!(window.ethereum || window.bitkeep);
      }

      return hasInjectedEvmProvider('isBitgetWallet') || window.bitkeep;
    },
    getDeepLink() {
      return `https://bkcode.vip?action=dapp&url=${window.location.href}`;
    },
    getQRCodeUri(uri) {
      return `bitkeep://bkconnect/wc?uri=${encodeURIComponent(uri)}`;
    },
    getCreateConnectorFn() {
      return injected({
        shimDisconnect: true,
        target: {
          id: bitgetWallet().id,
          name: bitgetWallet().name,
          async provider() {
            if (isMobile()) {
              return window.ethereum || window.bitkeep?.ethereum;
            }

            return getInjectedEvmProvider('isBitgetWallet') ?? window.bitkeep?.ethereum;
          },
        },
        ...connectorOptions,
      });
    },
    ...restProps,
  };
}
