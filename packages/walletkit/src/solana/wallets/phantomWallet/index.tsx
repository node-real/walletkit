import { PhantomWalletAdapter, PhantomWalletAdapterConfig } from '@solana/wallet-adapter-wallets';
import { hasSolanaInjectedProvider } from '../utils';
import { SolanaWallet } from '../types';
import { phantomWalletConfig } from '@/core/configs/phantomWallet';

interface PhantomOptions extends Partial<SolanaWallet> {
  adapterOptions?: Partial<PhantomWalletAdapterConfig>;
}

export function phantomWallet(props: PhantomOptions = {}): SolanaWallet {
  const { adapterOptions, ...restProps } = props;

  return {
    ...phantomWalletConfig,
    id: 'solana:phantom',
    walletType: 'solana',
    adapterName: 'Phantom',
    showQRCode: false,
    platforms: ['browser-android', 'browser-ios', 'browser-pc'],
    isInstalled() {
      return hasSolanaInjectedProvider('isPhantom');
    },
    getDeepLink() {
      const encodedUrl = encodeURIComponent(window.location.href);
      const encodeDapp = encodeURIComponent(window.origin);
      return `https://phantom.app/ul/browse/${encodedUrl}?ref=${encodeDapp}`;
    },
    getAdapter() {
      return new PhantomWalletAdapter({
        ...adapterOptions,
      });
    },
    ...restProps,
  };
}
