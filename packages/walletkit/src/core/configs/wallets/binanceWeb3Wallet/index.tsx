import { WalletConfig } from '../types';
import { BinanceWeb3WalletIcon, BinanceWeb3WalletTransparentIcon } from './icon';

export const binanceWeb3WalletConfig: WalletConfig = {
  id: 'binanceWeb3Wallet',
  name: 'Binance Web3 Wallet',
  logos: {
    default: <BinanceWeb3WalletIcon />,
    transparent: <BinanceWeb3WalletTransparentIcon />,
  },
  downloadUrls: {
    default: 'https://www.binance.com/en/web3wallet',
  },
  spinnerColor: undefined,
};
