import { BinanceW3WParameters, getWagmiConnectorV2 } from '@binance/w3w-wagmi-connector-v2';
import { isInBinance } from '@binance/w3w-utils';
import { isMobile, isTMA } from '@/core/base/utils/mobile';
import { binanceWalletConfig } from '@/core/configs/binanceWallet';
import { EvmWallet } from '../types';
import { getEvmInjectedProvider } from '../utils';
import { sleep } from 'tronweb/utils';
import { injected } from '../injected';

export interface BinanceWalletOptions extends Partial<EvmWallet> {
  connectorOptions?: BinanceW3WParameters;
}

export function binanceWallet(props: BinanceWalletOptions = {}): EvmWallet {
  const { connectorOptions = {}, ...restProps } = props;

  return {
    ...binanceWalletConfig,
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
      const encodedUri = encodeURIComponent(uri);
      return `https://app.binance.com/cedefi/wc?uri=${encodedUri}`;
    },
    getCreateConnectorFn() {
      if (isInBinance()) {
        let isReady = false;

        return injected({
          shimDisconnect: true,
          target: {
            id: this.id,
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
      }

      if (typeof window !== 'undefined') {
        const originalAppendChild = document.body.appendChild;

        document.body.appendChild = function (node, ...params) {
          if (node instanceof HTMLAnchorElement && node.href?.startsWith('bnc://')) {
            node.href = `https://app.binance.com/en/download?_dp=${window.btoa(node.href)}`;
            node.target = '_blank';
            // node.href = node.href.replace('bnc://', 'https://');

            // const qs = node.href.replace('bnc://app.binance.com/mp/app?', '');
            // node.href = `https://app.binance.com/?_dp=${encodeURI(`/mp/app?${qs}`)}`;
            const div = document.createElement('div');
            div.textContent = node.href;
            document.body.appendChild(div);
          }
          return originalAppendChild.call(document.body, node, ...params) as any;
        };
      }

      const connector = getWagmiConnectorV2();
      return connector({
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
