import { injected } from '../injected';
import { InjectedWalletOptions, WalletProps } from '..';
import { getInjectedProvider, hasInjectedProvider } from '../utils';
import { MathWalletIcon, MathWalletTransparentIcon } from './icon';

export const MATH_WALLET_ID = 'mathWallet';
export const MATH_WALLET_NAME = 'Math Wallet';

export function mathWallet(props: InjectedWalletOptions = {}): WalletProps {
  const { connectorOptions, ...restProps } = props;

  return {
    id: MATH_WALLET_ID,
    name: MATH_WALLET_NAME,
    logos: {
      default: <MathWalletIcon />,
      transparent: <MathWalletTransparentIcon />,
    },
    downloadUrls: {
      default: 'https://mathwallet.org',
    },
    showQRCode: false,
    spinnerColor: undefined,
    isInstalled: hasInjectedMathWallet,
    getDeepLink: () => {
      // return `mathwallet://mathwallet.org?action=link&value=${window.location.href}`;
      // return `mathwallet://wc?uri=${encodeURIComponent(uri)}`;
      return undefined;
    },
    getQRCodeUri: (uri) => {
      return uri;
    },
    getCreateConnectorFn: () => {
      return injected({
        shimDisconnect: true,
        target: {
          id: MATH_WALLET_ID,
          name: MATH_WALLET_NAME,
          async provider() {
            if (typeof window === 'undefined') return;

            const provider = getInjectedProvider('isMathWallet');
            return provider;
          },
        },
        ...connectorOptions,
      });
    },
    ...restProps,
  };
}

export function hasInjectedMathWallet() {
  if (typeof window === 'undefined') return false;

  return hasInjectedProvider('isMathWallet');
}
