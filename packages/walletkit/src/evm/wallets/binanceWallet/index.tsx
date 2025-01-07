import { binanceWalletConfig } from '@/core/configs/binanceWallet';
import { EvmWallet, InjectedEvmWalletOptions } from '../types';
import { injected } from '../injected';
import { isMobile } from '@/core/base/utils/mobile';
import { sleep } from '@/core/utils/common';
import { getEvmInjectedProvider } from '../utils';

export function binanceWallet(props: InjectedEvmWalletOptions = {}): EvmWallet {
  const { connectorOptions, ...restProps } = props;

  return {
    ...binanceWalletConfig,
    id: 'binanceWallet',
    walletType: 'evm',
    showQRCode: true,
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
      let isReady = false;

      return injected({
        shimDisconnect: true,
        target: {
          id: binanceWallet().id,
          name: binanceWallet().name,
          async provider() {
            if (isMobile() && binanceWallet().isInstalled() && !isReady) {
              await sleep(3000);
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

// binance web3 wallet changes its name to `binance wallet`, retaining the previous wallet id
export function binanceWeb3Wallet(props: InjectedEvmWalletOptions = {}): EvmWallet {
  return {
    ...binanceWallet(props),
    id: 'binanceWeb3Wallet',
  };
}

function getProvider() {
  if (typeof window === 'undefined') return;
  return getEvmInjectedProvider('isBinance');
}
