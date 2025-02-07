import { WalletConfig } from '../types';
import { UXUYWalletIcon, UXUYWalletTransparentIcon } from './icon';

export const uxuyWalletConfig: WalletConfig = {
  name: 'UXUY Wallet',
  logos: {
    default: <UXUYWalletIcon />,
    transparent: <UXUYWalletTransparentIcon />,
  },
  downloadUrls: {
    default: 'https://uxuy.com/',
  },
  spinnerColor: '#1098FC',
};
