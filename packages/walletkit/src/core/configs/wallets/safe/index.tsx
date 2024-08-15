import { WalletConfig } from '../types';
import { SafeIcon } from './icon';

export const safeConfig: WalletConfig = {
  id: 'safe',
  name: 'Safe Wallet',
  logos: {
    default: <SafeIcon />,
  },
  downloadUrls: {
    default: undefined,
  },
};
