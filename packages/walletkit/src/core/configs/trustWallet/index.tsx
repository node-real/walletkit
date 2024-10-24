import { WalletConfig } from '../types';
import { TrustWalletIcon, TrustWalletTransparentIcon } from './icon';

export const trustWalletConfig: WalletConfig = {
  name: 'Trust Wallet',
  logos: {
    default: <TrustWalletIcon />,
    transparent: <TrustWalletTransparentIcon />,
  },
  downloadUrls: {
    default: 'https://trustwallet.com/',
  },
  spinnerColor: '#1098FC',
};
