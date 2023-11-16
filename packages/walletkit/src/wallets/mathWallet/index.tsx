import { Chain } from 'wagmi';

import { WalletProps } from '../types';
import { MathWalletDarkIcon, MathWalletLightIcon } from './icon';
import { CustomConnector } from '../custom/connector';
import { getInjectedProvider, hasInjectedProvider } from '../utils';
import { PartialCustomProps } from '../custom';

export const MATH_WALLET_ID = 'mathWallet';

export function mathWallet(props: PartialCustomProps = {}): WalletProps {
  const { connectorOptions, ...restProps } = props;

  return {
    id: MATH_WALLET_ID,
    name: 'Math Wallet',
    logos: {
      default: {
        light: <MathWalletLightIcon />,
        dark: <MathWalletDarkIcon />,
      },
    },
    downloadUrls: {
      default: 'https://mathwallet.org',
    },
    spinnerColor: undefined,
    installed: isMathWallet(),
    createConnector: (chains: Chain[]) => {
      return new CustomConnector({
        id: MATH_WALLET_ID,
        chains,
        options: {
          name: 'Math Wallet',
          shimDisconnect: true,
          getProvider() {
            if (typeof window === 'undefined') return;

            const provider = getInjectedProvider('isMathWallet');
            return provider;
          },
          ...connectorOptions,
        },
      });
    },
    getUri: () => {
      return `mathwallet://mathwallet.org?action=link&value=${window.location.href}`;
    },
    ...restProps,
  };
}

export function isMathWallet() {
  if (typeof window === 'undefined') return false;

  return hasInjectedProvider('isMathWallet');
}
