import { BinanceW3WParameters, getWagmiConnectorV2 } from '@binance/w3w-wagmi-connector-v2';
import { isAndroid, isTMA } from '@/core/base/utils/mobile';
import { binanceWalletConfig } from '@/core/configs/binanceWallet';
import { EvmWallet } from '../types';
import { getEvmInjectedProvider } from '../utils';

export interface BinanceWalletOptions extends Partial<EvmWallet> {
  connectorOptions?: BinanceW3WParameters;
}

export function binanceWallet(props: BinanceWalletOptions = {}): EvmWallet {
  const { connectorOptions, ...restProps } = props;

  return {
    ...binanceWalletConfig,
    id: 'binanceWallet',
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
      const connector = getWagmiConnectorV2();
      return connector({
        ...connectorOptions,
      });
    },
    ...restProps,
  };
}

// binance web3 wallet changes its name to `binance wallet`, retaining the previous wallet id
export function binanceWeb3Wallet(props: BinanceWalletOptions = {}): EvmWallet {
  return {
    ...binanceWallet(props),
    id: 'binanceWeb3Wallet',
  };
}

function getProvider() {
  if (typeof window === 'undefined') return;
  return getEvmInjectedProvider('isBinance');
}
