import { BinanceW3WParameters, getWagmiConnectorV2 } from '@binance/w3w-wagmi-connector-v2';
import { isMobile, isTMA } from '@/core/base/utils/mobile';
import { binanceWalletConfig } from '@/core/configs/binanceWallet';
import { EvmWallet } from '../types';
import { getEvmInjectedProvider } from '../../utils/getEvmInjectedProvider';
import { sleep } from '@/core/utils/common';
import { injected } from '../injected';

export interface BinanceWalletOptions extends Partial<EvmWallet> {
  connectorOptions?: BinanceW3WParameters;
}

/**
 * Detect if running inside the Binance App in-app browser.
 * The Binance App sets window.isBinance = true.
 */
function isInBinanceApp(): boolean {
  if (typeof window === 'undefined') return false;
  return Boolean(window.isBinance);
}

/**
 * Detect if the Binance Web3 Wallet browser extension is installed.
 * The extension injects window.binancew3w.
 */
function isBinanceExtensionInstalled(): boolean {
  if (typeof window === 'undefined') return false;
  return Boolean(window.binancew3w);
}

/**
 * Get the Binance EVM provider.
 * Priority: window.ethereum.isBinance > window.binancew3w.ethereum
 */
function getBinanceProvider(): any {
  if (typeof window === 'undefined') return undefined;
  // Standard EIP-1193: injected by Binance App or extension via window.ethereum
  const injectedProvider = getEvmInjectedProvider('isBinance');
  if (injectedProvider) return injectedProvider;
  // Fallback: standalone provider from extension
  return window.binancew3w?.ethereum;
}

/**
 * Returns true if any Binance wallet source is available.
 */
function isBinanceInstalled(): boolean {
  return isInBinanceApp() || isBinanceExtensionInstalled() || Boolean(getBinanceProvider());
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
        get connectType() {
          return isBinanceInstalled() ? ('default' as const) : ('sdk' as const);
        },
        isInstalled: isBinanceInstalled,
        getCreateConnectorFn() {
          if (isBinanceInstalled()) {
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
        isInstalled: isBinanceInstalled,
        getAppLink() {
          const url = window.location.href;
          const base = 'bnc://app.binance.com/mp/app';
          const appId = 'yFK5FCqYprrXDiVFbhyRx7';
          const startPagePath = window.btoa('/pages/browser/index');
          const startPageQuery = window.btoa(`url=${url}`);
          const deeplink = `${base}?appId=${appId}&startPagePath=${startPagePath}&startPageQuery=${startPageQuery}`;
          const dp = window.btoa(deeplink);
          return `https://app.binance.com/en/download?_dp=${dp}`;
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
