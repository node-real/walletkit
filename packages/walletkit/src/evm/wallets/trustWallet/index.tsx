import { sleep } from '@/core/utils/common';
import { trustWalletConfig } from '@/core/configs/trustWallet';
import { injected } from '../injected';
import { EvmWallet, InjectedEvmWalletOptions } from '../types';
import { getEvmInjectedProvider } from '../utils';
import { isAndroid, isTMA } from '@/core/base/utils/mobile';

export function trustWallet(props: InjectedEvmWalletOptions = {}): EvmWallet {
  const { connectorOptions, ...restProps } = props;

  return {
    ...trustWalletConfig,
    id: 'trust',
    walletType: 'evm',
    showQRCode: false,
    platforms: ['tg-android', 'tg-ios', 'tg-pc', 'browser-android', 'browser-ios', 'browser-pc'],
    isInstalled() {
      return !!getProvider();
    },
    getDeepLink() {
      const encodedUrl = encodeURIComponent(window.location.href);
      return `https://link.trustwallet.com/open_url?coin_id=60&url=${encodedUrl}`;
    },
    getUri(uri) {
      let encodedUri = encodeURIComponent(uri);
      if (isTMA() && isAndroid()) {
        encodedUri = encodeURIComponent(encodedUri);
      }
      return `https://link.trustwallet.com/wc?uri=${encodedUri}`;
    },
    getCreateConnectorFn() {
      let isReady = false;
      return injected({
        shimDisconnect: true,
        target: {
          id: trustWallet().id,
          name: trustWallet().name,
          async provider() {
            if (!isReady) {
              await sleep();
            }
            isReady = true;
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

  // binance web3 wallet will inject a trustwallet object with no request on mobile
  if (!window?.trustwallet?.request) return;

  return window.trustwallet ?? window.trustWallet ?? getEvmInjectedProvider('isTrust');
}
