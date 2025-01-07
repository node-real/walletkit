import { WalletConfig } from '../types';
import { BinanceWalletIcon, BinanceWalletTransparentIcon } from './icon';

export const binanceWalletConfig: WalletConfig = {
  name: 'Binance Wallet',
  logos: {
    default: <BinanceWalletIcon />,
    transparent: <BinanceWalletTransparentIcon />,
  },
  downloadUrls: {
    default: 'https://www.binance.com/en/web3wallet',
  },
  spinnerColor: undefined,
};
