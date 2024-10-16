import { WalletConfig } from '../types';
import { BitgetWalletIcon } from './icon';

export const bitgetWalletConfig: WalletConfig = {
  name: 'Bitget Wallet',
  logos: {
    default: <BitgetWalletIcon />,
    transparent: <BitgetWalletIcon />,
  },
  downloadUrls: {
    default: 'https://web3.bitget.com/',
  },
  spinnerColor: undefined,
};
