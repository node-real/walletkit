import { BinanceW3WParameters, getWagmiConnectorV2 } from '@binance/w3w-wagmi-connector-v2';
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

  const getProvider = () => {
    if (typeof window === 'undefined') return;
    return getEvmInjectedProvider('isBinance');
  };

  const isInstalled = () => {
    return !!getProvider();
  };

  return {
    ...binanceWalletConfig,
    id: 'binanceWeb3Wallet',
    walletType: 'evm',
    behaviors: [
      {
        platforms: ['tg-android', 'tg-ios', 'tg-pc', 'browser-pc'],
        connectType: 'sdk',
        getCreateConnectorFn() {
          if (typeof window !== 'undefined' && isMobile() && isTMA()) {
            const originalAppendChild = document.body.appendChild;

            document.body.appendChild = function (node, ...params) {
              if (node instanceof HTMLAnchorElement && node.href?.startsWith('bnc://')) {
                node.href = `https://app.binance.com/en/download?_dp=${window.btoa(node.href)}`;
                node.target = '_blank';
              }
              return originalAppendChild.call(document.body, node, ...params) as any;
            };
          }

          const connector = getWagmiConnectorV2();
          return connector({
            ...connectorOptions,
          });
        },
      },
      {
        platforms: ['browser-android', 'browser-ios'],
        connectType: 'default',
        isInstalled,
        getAppLink() {
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
        getCreateConnectorFn() {
          let isReady = false;

          return injected({
            shimDisconnect: true,
            target: {
              id: binanceWallet().id,
              name: binanceWallet().name,
              async provider() {
                if (isMobile() && isInstalled() && !isReady) {
                  await sleep(3000);
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
