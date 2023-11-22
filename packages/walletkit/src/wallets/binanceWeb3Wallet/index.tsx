import { Chain } from 'wagmi';
import { PartialCustomProps, WalletProps } from '..';
import { CustomConnector } from '../custom/connector';
import { getInjectedProvider } from '../utils';
import { BinanceWeb3WalletIcon, BinanceWeb3WalletTransparentIcon } from './icon';

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
    installed: isBinanceWeb3Wallet(),
    createConnector: (chains: Chain[]) => {
      return new CustomConnector({
        id: BINANCE_WEB3_WALLET_ID,
        chains,
        options: {
          name: 'Binance Web3 Wallet',
          shimDisconnect: true,
          getProvider() {
            if (typeof window === 'undefined') return;

            const provider = getInjectedProvider('isOkxWallet') ?? window.okexchain;
            return provider;
          },
          ...connectorOptions,
        },
      });
    },
    getDeepLink: () => {
      return undefined;
    },
    getQRCodeUri(uri) {
      return uri;
    },
    ...restProps,
  };
}

export function isBinanceWeb3Wallet() {
  if (typeof window === 'undefined') return false;

  return false;
}
