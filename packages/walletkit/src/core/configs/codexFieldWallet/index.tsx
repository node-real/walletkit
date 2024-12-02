import { WalletConfig } from '../types';
import { CodexFieldWalletIcon, CodexFieldWalletTransparentIcon } from './icon';

export const codexFieldWalletConfig: WalletConfig = {
  name: 'CodexField Wallet',
  logos: {
    default: <CodexFieldWalletIcon />,
    transparent: <CodexFieldWalletTransparentIcon />,
  },
  downloadUrls: {
    default: 'https://t.me/codexfieldbot',
  },
  spinnerColor: '#1098FC',
};
