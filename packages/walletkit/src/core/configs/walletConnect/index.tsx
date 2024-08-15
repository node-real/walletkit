import { WalletConfig } from '../types';
import { WalletConnectIcon, WalletConnectTransparentIcon } from './icon';

export const walletConnectConfig: WalletConfig = {
  name: 'WalletConnect',
  logos: {
    default: <WalletConnectIcon />,
    transparent: <WalletConnectTransparentIcon />,
  },
  downloadUrls: {
    default: undefined,
  },
};
