import { Chain } from 'wagmi';

import { WalletProps } from '../types';
import { BinanceWeb3WalletIcon } from './icon';
import { CustomConnector } from '../custom/connector';
import { getInjectedProvider } from '../utils';
import { PartialCustomProps } from '../custom';

export const BINANCE_WEB3_WALLET_ID = 'binanceWeb3Wallet';

export function binanceWeb3Wallet(props: PartialCustomProps = {}): WalletProps {
  const { connectorOptions, ...restProps } = props;

  return {
    id: BINANCE_WEB3_WALLET_ID,
    name: 'Binance Web3 Wallet',
    logos: {
      default: <BinanceWeb3WalletIcon />,
    },
    downloadUrls: {
      default: 'https://www.binance.com/en/web3wallet',
    },
    spinnerColor: undefined,
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
    getUri: () => {
      return undefined;
    },
    ...restProps,
  };
}

export function isBinanceWeb3Wallet() {
  if (typeof window === 'undefined') return false;

  return false;
}
