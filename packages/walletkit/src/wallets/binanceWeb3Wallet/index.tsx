import { Chain } from 'wagmi';
import { PartialCustomProps, WalletProps } from '..';
import { BinanceWeb3WalletIcon, BinanceWeb3WalletTransparentIcon } from './icon';
import { hasInjectedProvider } from '../utils';
import { CustomConnector } from '../custom/connector';
import { isMobile } from '@/base/utils/mobile';

export const BINANCE_WEB3_WALLET_ID = 'binanceWeb3Wallet';
export const BINANCE_WEB3_WALLET_NAME = 'Binance Web3 Wallet';

export function binanceWeb3Wallet(props: PartialCustomProps = {}): WalletProps {
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
    showQRCode: false,
    isInstalled: isBinanceWeb3Wallet,
    createConnector: (chains: Chain[]) => {
      return new CustomConnector({
        id: BINANCE_WEB3_WALLET_ID,
        chains,
        options: {
          name: BINANCE_WEB3_WALLET_NAME,
          shimDisconnect: true,
          getProvider() {
            if (typeof window === 'undefined') return;

            if (isMobile()) {
              return window.ethereum;
            }

            return window.binancew3w?.ethereum;
          },
          ...connectorOptions,
        },
      });
    },
    getDeepLink: () => {
      const { bnc } = getDeepLink(window.location.href);
      return bnc;
    },
    getQRCodeUri(uri) {
      return uri;
    },
    ...restProps,
  };
}

export function isBinanceWeb3Wallet() {
  if (typeof window === 'undefined') return false;
  return !!window.binancew3w?.ethereum || hasInjectedProvider('isBinance' as any);
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
