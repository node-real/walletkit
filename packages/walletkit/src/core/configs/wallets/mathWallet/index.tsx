import { WalletConfig } from '../types';
import { MathWalletIcon, MathWalletTransparentIcon } from './icon';

export const mathWalletConfig: WalletConfig = {
  id: 'mathWallet',
  name: 'Math Wallet',
  logos: {
    default: <MathWalletIcon />,
    transparent: <MathWalletTransparentIcon />,
  },
  downloadUrls: {
    default: 'https://mathwallet.org',
  },
  spinnerColor: undefined,
};
