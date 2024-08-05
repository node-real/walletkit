import { InjectedWalletOptions, WalletProps } from '../types';
import { PhantomWalletAdapter, PhantomWalletAdapterConfig } from '@solana/wallet-adapter-wallets';
import { hasInjectedProvider } from '../utils';
import { PhantomWalletIcon, PhantomWalletTransparentIcon } from '@/ui/components/icons/wallets';

const PHANTOM_WALLET_ID = 'Phantom';
const PHANTOM_WALLET_NAME = 'Phantom';

export interface PhantomOptions extends Partial<WalletProps> {
  adapterOptions?: Partial<PhantomWalletAdapterConfig>;
}

export function phantomWallet(props: InjectedWalletOptions = {}): WalletProps {
  const { adapterOptions, ...restProps } = props;

  return {
    id: PHANTOM_WALLET_ID,
    name: PHANTOM_WALLET_NAME,
    logos: {
      default: <PhantomWalletIcon />,
      transparent: <PhantomWalletTransparentIcon />,
    },
    downloadUrls: {
      default: 'https://phantom.app/',
    },
    spinnerColor: undefined,
    showQRCode: false,
    isInstalled: hasInjectedPhantomWallet,
    getAdapter: () => {
      return new PhantomWalletAdapter({
        ...adapterOptions,
      });
    },
    ...restProps,
  };
}

export function hasInjectedPhantomWallet() {
  return hasInjectedProvider('isPhantom');
}
