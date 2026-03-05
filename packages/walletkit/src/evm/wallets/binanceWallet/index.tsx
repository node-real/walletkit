import { BinanceW3WParameters, getWagmiConnectorV2 } from '@binance/w3w-wagmi-connector-v2';
import { isMobile, isTMA } from '@/core/base/utils/mobile';
import { binanceWalletConfig } from '@/core/configs/binanceWallet';
import { isBinanceInstalled, getBinanceAppLink } from '@/core/utils/binance';
import { EvmWallet } from '../types';
import { getEvmInjectedProvider } from '../../utils/getEvmInjectedProvider';
import { sleep } from '@/core/utils/common';
import { injected } from '../injected';

export interface BinanceWalletOptions extends Partial<EvmWallet> {
  connectorOptions?: BinanceW3WParameters;
}

/**
 * Get the Binance EVM provider.
 * Priority: window.ethereum.isBinance > window.binancew3w.ethereum
 */
function getBinanceProvider(): any {
  if (typeof window === 'undefined') return undefined;
  const injectedProvider = getEvmInjectedProvider('isBinance');
  if (injectedProvider) return injectedProvider;
  return window.binancew3w?.ethereum;
}

/**
 * Returns true if any Binance EVM wallet source is available.
 */
function isBinanceEvmInstalled(): boolean {
  return isBinanceInstalled() || Boolean(getBinanceProvider());
}

export function binanceWallet(props: BinanceWalletOptions = {}): EvmWallet {
  const { connectorOptions = {}, ...restProps } = props;

  return {
    ...binanceWalletConfig,
    id: 'binanceWeb3Wallet',
    walletType: 'evm',
    behaviors: [
      // Behavior 1: Telegram Mini App - always use SDK connector
      {
        platforms: ['tg-android', 'tg-ios', 'tg-pc'],
        connectType: 'sdk' as const,
        getCreateConnectorFn() {
          // In TMA, intercept bnc:// deep links and convert to HTTPS download links
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
          return (connector as any)({ ...connectorOptions });
        },
      },

      // Behavior 2: Desktop browser - smart connector selection
      //   Binance App or extension installed -> injected (instant, like MetaMask)
      //   No extension -> SDK (QR/deeplink modal)
      {
        platforms: ['browser-pc'],
        connectType: 'default' as const,
        isInstalled: isBinanceEvmInstalled,
        getCreateConnectorFn() {
          if (isBinanceEvmInstalled()) {
            return injected({
              shimDisconnect: true,
              target: {
                id: 'binanceWeb3Wallet',
                name: 'Binance Wallet',
                async provider() {
                  return getBinanceProvider();
                },
              },
              ...connectorOptions,
            });
          }
          // No extension: SDK connector opens QR/deeplink modal
          const connector = getWagmiConnectorV2();
          return (connector as any)({ ...connectorOptions });
        },
      },

      // Behavior 3: Mobile browser - injected + deep link fallback
      {
        platforms: ['browser-android', 'browser-ios'],
        connectType: 'default' as const,
        isInstalled: isBinanceEvmInstalled,
        getAppLink() {
          return getBinanceAppLink();
        },
        getCreateConnectorFn() {
          let isReady = false;
          return injected({
            shimDisconnect: true,
            target: {
              id: 'binanceWeb3Wallet',
              name: 'Binance Wallet',
              async provider() {
                if (isMobile() && isBinanceInstalled() && !isReady) {
                  await sleep(3000);
                }
                isReady = true;
                return getBinanceProvider();
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
