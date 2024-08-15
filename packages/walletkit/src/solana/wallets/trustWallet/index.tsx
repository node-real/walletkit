import { TrustWalletAdapter, TrustWalletAdapterConfig } from '@solana/wallet-adapter-wallets';
import { SolanaWallet } from '../types';
import { trustWalletConfig } from '@/core/configs/wallets/trustWallet';
import { hasInjectedSolanaProvider } from '../utils';

interface TrustWalletOptions extends Partial<SolanaWallet> {
  adapterOptions?: Partial<TrustWalletAdapterConfig>;
}

export function trustWallet(props: TrustWalletOptions = {}): SolanaWallet {
  const { adapterOptions, ...restProps } = props;

  return {
    ...trustWalletConfig,
    walletType: 'solana',
    adapterName: 'Trust',
    showQRCode: false,
    isInstalled: () => {
      if (typeof window === 'undefined') return false;

      return (
        hasInjectedSolanaProvider('isTrust') ||
        window?.trustwallet?.solana?.isTrust ||
        window?.trustWallet?.solana?.isTrust
      );
    },
    getAdapter: () => {
      return new TrustWalletAdapter({
        ...adapterOptions,
      });
    },
    ...restProps,
  };
}
