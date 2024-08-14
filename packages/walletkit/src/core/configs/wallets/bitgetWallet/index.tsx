import { WalletConfig } from '../types';
import { BitgetWalletIcon, BitgetWalletTransparentIcon } from './icon';

export const bitgetWalletConfig: WalletConfig = {
  id: 'bitgetWallet',
  name: 'Bitget Wallet',
  logos: {
    default: <BitgetWalletIcon />,
    transparent: <BitgetWalletTransparentIcon />,
  },
  downloadUrls: {
    default: 'https://web3.bitget.com/',
  },
  spinnerColor: undefined,
};
