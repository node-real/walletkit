import { WalletConfig } from '../types';
import { TronLinkIcon, TronLinkTransparentIcon } from './icon';

export const tronLinkConfig: WalletConfig = {
  name: 'TronLink',
  logos: {
    default: <TronLinkIcon />,
    transparent: <TronLinkTransparentIcon />,
  },
  downloadUrls: {
    default: 'https://www.tronlink.org/',
  },
  spinnerColor: '#2980FE',
};
