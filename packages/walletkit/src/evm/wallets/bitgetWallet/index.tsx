import { bitgetWalletConfig } from '@/core/configs/bitgetWallet';
import { EvmWallet, InjectedEvmWalletOptions } from '../types';
import { injected } from '../injected';
import { getEvmInjectedProvider } from '../utils';
import { isAndroid, isTMA } from '@/core/base/utils/mobile';

export function bitgetWallet(props: InjectedEvmWalletOptions = {}): EvmWallet {
  const { connectorOptions, ...restProps } = props;

  const getUri = (uri: string) => {
    let encodedUri = encodeURIComponent(uri);
    if (isTMA() && isAndroid()) {
      encodedUri = encodeURIComponent(encodedUri);
    }
    return `https://bkcode.vip/wc?uri=${encodedUri}`;
  };

  const getProvider = () => {
    if (typeof window === 'undefined') return;
    return getEvmInjectedProvider('isBitEthereum') ?? window.bitkeep?.ethereum;
  };

  return {
    ...bitgetWalletConfig,
    id: 'bitgetWallet',
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
          return `https://bkcode.vip?action=dapp&url=${window.location.href}`;
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
      },
    ],
    ...restProps,
  };
}
