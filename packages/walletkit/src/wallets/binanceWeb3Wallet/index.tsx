import { Chain } from 'wagmi';
import { PartialCustomProps, WalletProps } from '..';
import { CustomConnector } from '../custom/connector';
import { BinanceWeb3WalletIcon, BinanceWeb3WalletTransparentIcon } from './icon';
import { isMobile } from '@/base/utils/mobile';
import { hasInjectedProvider } from '../utils';

export const BINANCE_WEB3_WALLET_ID = 'binanceWeb3Wallet';

export function binanceWeb3Wallet(props: PartialCustomProps = {}): WalletProps {
  const { connectorOptions, ...restProps } = props;

  return {
    id: BINANCE_WEB3_WALLET_ID,
    name: 'Binance Web3 Wallet',
    logos: {
      default: <BinanceWeb3WalletIcon />,
      transparent: <BinanceWeb3WalletTransparentIcon />,
    },
    downloadUrls: {
      default: 'https://www.binance.com/en/web3wallet',
    },
    spinnerColor: undefined,
    showQRCode: true,
    isInstalled: isBinanceWeb3Wallet,
    createConnector: (chains: Chain[]) => {
      return new CustomConnector({
        id: BINANCE_WEB3_WALLET_ID,
        chains,
        options: {
          name: 'Binance Web3 Wallet',
          shimDisconnect: true,
          getProvider() {
            if (typeof window === 'undefined') return;

            if (isMobile()) {
              return window.ethereum;
            }
          },
          ...connectorOptions,
        },
      });
    },
    getDeepLink: () => {
      const { http } = getDeepLink(window.location.href);
      return http;
    },
    getQRCodeUri(uri) {
      return uri;
    },
    ...restProps,
  };
}

export function isBinanceWeb3Wallet() {
  return hasInjectedProvider('isBinance' as any);
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
