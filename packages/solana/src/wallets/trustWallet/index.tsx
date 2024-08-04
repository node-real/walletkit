import { hasInjectedProvider } from '../utils';

import { WalletProps } from '../types';
import {
  TrustWalletLightIcon,
  TrustWalletDarkIcon,
  TrustWalletTransparentLightIcon,
  TrustWalletTransparentDarkIcon,
} from '@node-real/walletkit-ui';

import { TrustWalletAdapter, TrustWalletAdapterConfig } from '@solana/wallet-adapter-wallets';

const TRUST_WALLET_ID = 'Trust';
const TRUST_WALLET_NAME = 'Trust Wallet';

export interface TrustWalletOptions extends Partial<WalletProps> {
  adapterOptions?: Partial<TrustWalletAdapterConfig>;
}

export function trustWallet(props: TrustWalletOptions = {}): WalletProps {
  const { adapterOptions, ...restProps } = props;

  return {
    id: TRUST_WALLET_ID,
    name: TRUST_WALLET_NAME,
    logos: {
      default: {
        light: <TrustWalletLightIcon />,
        dark: <TrustWalletDarkIcon />,
      },
      transparent: {
        light: <TrustWalletTransparentLightIcon />,
        dark: <TrustWalletTransparentDarkIcon />,
      },
    },
    downloadUrls: {
      default: 'https://trustwallet.com/',
    },
    spinnerColor: '#1098FC',
    showQRCode: false,
    isInstalled: hasInjectedTrustWallet,
    getAdapter: () => {
      return new TrustWalletAdapter({
        ...adapterOptions,
      });
    },
    ...restProps,
  };
}

export function hasInjectedTrustWallet() {
  if (typeof window === 'undefined') return false;

  return (
    hasInjectedProvider('isTrust') ||
    window?.trustwallet?.solana?.isTrust ||
    window?.trustWallet?.solana?.isTrust
  );
}
