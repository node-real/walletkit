import { WalletConfig } from '../types';
import { CoinbaseWalletIcon, CoinbaseWalletTransparentIcon } from './icon';

export const coinbaseWalletConfig: WalletConfig = {
  name: 'Coinbase Wallet',
  logos: {
    default: <CoinbaseWalletIcon />,
    transparent: <CoinbaseWalletTransparentIcon />,
  },
  downloadUrls: {
    default: 'https://www.coinbase.com/wallet/downloads',
  },
  spinnerColor: undefined,
};
