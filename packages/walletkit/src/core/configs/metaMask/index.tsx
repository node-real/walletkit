import { WalletConfig } from '../types';
import { MetaMaskIcon, MetaMaskTransparentIcon } from './icon';

export const metaMaskConfig: WalletConfig = {
  name: 'MetaMask',
  logos: {
    default: <MetaMaskIcon />,
    transparent: <MetaMaskTransparentIcon />,
  },
  downloadUrls: {
    default: 'https://metamask.io/download/',
  },
  spinnerColor: '#F0B90B',
};
