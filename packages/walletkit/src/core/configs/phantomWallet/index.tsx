import { WalletConfig } from '../types';
import { PhantomWalletIcon, PhantomWalletTransparentIcon } from './icon';

export const phantomWalletConfig: WalletConfig = {
  name: 'Phantom',
  logos: {
    default: <PhantomWalletIcon />,
    transparent: <PhantomWalletTransparentIcon />,
  },
  downloadUrls: {
    default: 'https://phantom.app/',
  },
  spinnerColor: undefined,
};
