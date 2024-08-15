import { WalletConfig } from '../types';
import { SafeIcon } from './icon';

export const safeConfig: WalletConfig = {
  name: 'Safe Wallet',
  logos: {
    default: <SafeIcon />,
  },
  downloadUrls: {
    default: undefined,
  },
};
