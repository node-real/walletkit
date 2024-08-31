import { binanceWeb3WalletConfig } from '@/core/configs/binanceWeb3Wallet';
import { EvmWallet, InjectedEvmWalletOptions } from '../types';
import { injected } from '../injected';
import { isMobile } from '@/core/base/utils/mobile';
import { sleep } from '@/core/utils/common';
import { getEvmInjectedProvider } from '../utils';

export function binanceWeb3Wallet(props: InjectedEvmWalletOptions = {}): EvmWallet {
  const { connectorOptions, ...restProps } = props;

  return {
    ...binanceWeb3WalletConfig,
    id: 'binanceWeb3Wallet',
    walletType: 'evm',
    showQRCode: true,
    connectWithUri: false,
    isInstalled() {
      return !!getProvider();
    },
    getDeepLink() {
      const url = window.location.href;
      const base = 'bnc://app.binance.com/mp/app';
      const appId = 'yFK5FCqYprrXDiVFbhyRx7';

      const startPagePath = window.btoa('/pages/browser/index');
      const startPageQuery = window.btoa(`url=${url}`);
      const deeplink = `${base}?appId=${appId}&startPagePath=${startPagePath}&startPageQuery=${startPageQuery}`;
      const dp = window.btoa(deeplink);
      const http = `https://app.binance.com/en/download?_dp=${dp}`;

      return http;
    },
    getUri(uri) {
      return uri;
    },
    getCreateConnectorFn() {
      return injected({
        shimDisconnect: true,
        target: {
          id: binanceWeb3Wallet().id,
          name: binanceWeb3Wallet().name,
          async setup() {
            if (isMobile() && binanceWeb3Wallet().isInstalled()) {
              await sleep();
            }
          },
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
  return getEvmInjectedProvider('isBinance');
}
