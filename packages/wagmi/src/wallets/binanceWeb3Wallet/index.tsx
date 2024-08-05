import { InjectedWalletOptions, WalletProps } from '..';
import { hasInjectedProvider } from '../utils';
import { Connector } from 'wagmi';
import { injected } from '../injected';
import {
  BinanceWeb3WalletIcon,
  BinanceWeb3WalletTransparentIcon,
} from '@/ui/components/icons/wallets';
import { sleep } from '@/core/utils';
import { isMobile } from '@/ui/base/utils/mobile';

const BINANCE_WEB3_WALLET_ID = 'binanceWeb3Wallet';
const BINANCE_WEB3_WALLET_NAME = 'Binance Web3 Wallet';

export function binanceWeb3Wallet(props: InjectedWalletOptions = {}): WalletProps {
  const { connectorOptions, ...restProps } = props;

  return {
    id: BINANCE_WEB3_WALLET_ID,
    name: BINANCE_WEB3_WALLET_NAME,
    logos: {
      default: <BinanceWeb3WalletIcon />,
      transparent: <BinanceWeb3WalletTransparentIcon />,
    },
    downloadUrls: {
      default: 'https://www.binance.com/en/web3wallet',
    },
    spinnerColor: undefined,
    showQRCode: true,
    isInstalled: hasInjectedBinanceWeb3Wallet,
    getDeepLink: () => {
      const { bnc } = getDeepLink(window.location.href);
      return bnc;
    },
    getQRCodeUri: (uri) => {
      return uri;
    },
    getCreateConnectorFn: () => {
      return injected({
        shimDisconnect: true,
        target: {
          id: BINANCE_WEB3_WALLET_ID,
          name: BINANCE_WEB3_WALLET_NAME,
          async setup() {
            if (isMobile() && hasInjectedBinanceWeb3Wallet()) {
              (window.ethereum as any)?.enable?.();
              await sleep();
            }
          },
          async provider(window) {
            if (isMobile()) {
              return window?.ethereum;
            }
          },
        },
        ...connectorOptions,
      });
    },
    ...restProps,
  };
}

export function hasInjectedBinanceWeb3Wallet() {
  return hasInjectedProvider('isBinance');
}

export function isBinanceWeb3WalletConnector(connector?: Connector) {
  return connector?.id === BINANCE_WEB3_WALLET_ID;
}

const getDeepLink = (url: string) => {
  const base = 'bnc://app.binance.com/mp/app';
  const appId = 'yFK5FCqYprrXDiVFbhyRx7';

  const startPagePath = window.btoa('/pages/browser/index');
  const startPageQuery = window.btoa(`url=${url}`);
  const deeplink = `${base}?appId=${appId}&startPagePath=${startPagePath}&startPageQuery=${startPageQuery}`;
  const dp = window.btoa(deeplink);
  const http = `https://app.binance.com/en/download?_dp=${dp}`;

  return { http, bnc: deeplink };
};
