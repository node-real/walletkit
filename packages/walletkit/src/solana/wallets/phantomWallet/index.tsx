import { PhantomWalletAdapter, PhantomWalletAdapterConfig } from '@solana/wallet-adapter-wallets';
import { hasInjectedSolanaProvider } from '../utils';
import { SolanaWallet } from '../types';
import { phantomWalletConfig } from '@/core/configs/wallets/phantomWallet';

interface PhantomOptions extends Partial<SolanaWallet> {
  adapterOptions?: Partial<PhantomWalletAdapterConfig>;
}

export function phantomWallet(props: PhantomOptions = {}): SolanaWallet {
  const { adapterOptions, ...restProps } = props;

  return {
    ...phantomWalletConfig,
    adapterName: 'Phantom',
    showQRCode: false,
    isInstalled: () => {
      return hasInjectedSolanaProvider('isPhantom');
    },
    getAdapter: () => {
      return new PhantomWalletAdapter({
        ...adapterOptions,
      });
    },
    ...restProps,
  };
}
