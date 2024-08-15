import { WalletConfig } from '../types';
import { OkxWalletIcon, OkxWalletTransparentIcon } from './icon';

export const okxWalletConfig: WalletConfig = {
  name: 'OKX Wallet',
  logos: {
    default: <OkxWalletIcon />,
    transparent: <OkxWalletTransparentIcon />,
  },
  downloadUrls: {
    default: 'https://www.okx.com/web3',
  },
  spinnerColor: undefined,
};
