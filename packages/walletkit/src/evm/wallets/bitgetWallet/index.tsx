import { bitgetWalletConfig } from '@/core/configs/bitgetWallet';
import { EvmWallet, InjectedEvmWalletOptions } from '../types';
import { injected } from '../injected';
import { getEvmInjectedProvider } from '../utils';
import { isAndroid, isTMA } from '@/core/base/utils/mobile';

export function bitgetWallet(props: InjectedEvmWalletOptions = {}): EvmWallet {
  const { connectorOptions, ...restProps } = props;

  return {
    ...bitgetWalletConfig,
    id: 'bitgetWallet',
    walletType: 'evm',
    showQRCode: false,
    platforms: ['tg-android', 'tg-ios', 'tg-pc', 'browser-android', 'browser-ios', 'browser-pc'],
    isInstalled() {
      return !!getProvider();
    },
    getDeepLink() {
      return `https://bkcode.vip?action=dapp&url=${window.location.href}`;
    },
    getUri(uri) {
      let encodedUri = encodeURIComponent(uri);
      if (isTMA() && isAndroid()) {
        encodedUri = encodeURIComponent(encodedUri);
      }
      return `https://bkcode.vip/wc?uri=${encodedUri}`;
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
