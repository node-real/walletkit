import { WalletConfig } from '../types';
import { TokenPocketIcon, TokenPocketTransparentIcon } from './icon';

export const tokenPocketConfig: WalletConfig = {
  id: 'tokenPocket',
  name: 'TokenPocket',
  logos: {
    default: <TokenPocketIcon />,
    transparent: <TokenPocketTransparentIcon />,
  },
  downloadUrls: {
    default: 'https://www.tokenpocket.pro/en/download/app',
  },
  spinnerColor: '#2980FE',
};
