import { sleep } from '@/core/utils/common';
import { trustWalletConfig } from '@/core/configs/trustWallet';
import { injected } from '../injected';
import { EvmWallet, InjectedEvmWalletOptions } from '../types';
import { getEvmInjectedProvider } from '../utils';
import { isAndroid, isTMA } from '@/core/base/utils/mobile';

export function trustWallet(props: InjectedEvmWalletOptions = {}): EvmWallet {
  const { connectorOptions, ...restProps } = props;

  const getUri = (uri: string) => {
    let encodedUri = encodeURIComponent(uri);
    if (isTMA() && isAndroid()) {
      encodedUri = encodeURIComponent(encodedUri);
    }
    return `https://link.trustwallet.com/wc?uri=${encodedUri}`;
  };

  const getProvider = () => {
    if (typeof window === 'undefined') return;

    // binance web3 wallet will inject a trustwallet object with no request on mobile
    if (!window?.trustwallet?.request) return;

    return window.trustwallet ?? window.trustWallet ?? getEvmInjectedProvider('isTrust');
  };

  return {
    ...trustWalletConfig,
    id: 'trust',
    walletType: 'evm',
    behaviors: [
      {
        platforms: ['tg-android', 'tg-ios'],
        connectType: 'uri',
        getUri,
      },
      {
        platforms: ['tg-pc'],
        connectType: 'qrcode',
        getUri,
      },
      {
        platforms: ['browser-android', 'browser-ios', 'browser-pc'],
        connectType: 'default',
        isInstalled() {
          return !!getProvider();
        },
        getAppLink() {
          const encodedUrl = encodeURIComponent(window.location.href);
          return `https://link.trustwallet.com/open_url?coin_id=60&url=${encodedUrl}`;
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
      },
    ],
    ...restProps,
  };
}
