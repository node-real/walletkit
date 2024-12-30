import { binanceWeb3WalletConfig } from '@/core/configs/binanceWeb3Wallet';
import { EvmWallet } from '../types';
import { BinanceW3WParameters, getWagmiConnectorV2 } from '@binance/w3w-wagmi-connector-v2';
import { isAndroid, isMobile, isPC, isTMA } from '@/core/base/utils/mobile';
import { injected } from '../injected';
import { sleep } from '@/core/utils/common';
import { getEvmInjectedProvider } from '../utils';

export interface BinanceWeb3WalletOptions extends Partial<EvmWallet> {
  connectorOptions?: BinanceW3WParameters;
}

export function binanceWeb3Wallet(props: BinanceWeb3WalletOptions = {}): EvmWallet {
  const { connectorOptions, ...restProps } = props;

  return {
    ...binanceWeb3WalletConfig,
    id: 'binanceWeb3Wallet',
    walletType: 'evm',
    showQRCode: false,
    platforms: ['tg-android', 'tg-ios', 'tg-pc', 'browser-android', 'browser-ios', 'browser-pc'],
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
      let encodedUri = encodeURIComponent(uri);
      if (isTMA() && isAndroid()) {
        encodedUri = encodeURIComponent(encodedUri);
      }
      return `https://app.binance.com/cedefi/wc?uri=${encodedUri}`;
    },
    getCreateConnectorFn() {
      if (isPC()) {
        const connector = getWagmiConnectorV2();
        return connector({
          ...connectorOptions,
        }) as any;
      } else {
        let isReady = false;

        return injected({
          shimDisconnect: true,
          target: {
            id: binanceWeb3Wallet().id,
            name: binanceWeb3Wallet().name,
            async provider() {
              if (isMobile() && binanceWeb3Wallet().isInstalled() && !isReady) {
                await sleep();
              }
              isReady = true;
              return getProvider();
            },
          },
          ...connectorOptions,
        });
      }
    },
    ...restProps,
  };
}

function getProvider() {
  if (typeof window === 'undefined') return;
  return getEvmInjectedProvider('isBinance');
}
