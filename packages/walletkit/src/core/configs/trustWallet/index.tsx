import { WalletConfig } from '../types';
import {
  TrustWalletDarkIcon,
  TrustWalletLightIcon,
  TrustWalletTransparentDarkIcon,
  TrustWalletTransparentLightIcon,
} from './icon';

export const trustWalletConfig: WalletConfig = {
  name: 'Trust Wallet',
  logos: {
    default: {
      light: <TrustWalletLightIcon />,
      dark: <TrustWalletDarkIcon />,
    },
    transparent: {
      light: <TrustWalletTransparentLightIcon />,
      dark: <TrustWalletTransparentDarkIcon />,
    },
  },
  downloadUrls: {
    default: 'https://trustwallet.com/',
  },
  spinnerColor: '#1098FC',
};
