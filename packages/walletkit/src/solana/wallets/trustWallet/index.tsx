import { TrustWalletAdapter, TrustWalletAdapterConfig } from '@solana/wallet-adapter-wallets';
import { SolanaWallet } from '../types';
import { trustWalletConfig } from '@/core/configs/trustWallet';
import { hasSolanaInjectedProvider } from '../../utils/getSolanaInjectedProvider';

interface TrustWalletOptions extends Partial<SolanaWallet> {
  adapterOptions?: Partial<TrustWalletAdapterConfig>;
}

export function trustWallet(props: TrustWalletOptions = {}): SolanaWallet {
  const { adapterOptions, ...restProps } = props;

  return {
    ...trustWalletConfig,
    id: 'solana:trust',
    walletType: 'solana',
    adapterName: 'Trust',
    behaviors: [
      {
        platforms: ['browser-android', 'browser-ios', 'browser-pc'],
        connectType: 'default',
        isInstalled() {
          if (typeof window === 'undefined') return false;

          return (
            hasSolanaInjectedProvider('isTrust') ||
            window?.trustwallet?.solana?.isTrust ||
            window?.trustWallet?.solana?.isTrust
          );
        },
        getAppLink() {
          const encodedUrl = encodeURIComponent(window.location.href);
          return `https://link.trustwallet.com/open_url?coin_id=60&url=${encodedUrl}`;
        },
        getAdapter() {
          return new TrustWalletAdapter({
            ...adapterOptions,
          });
        },
      },
    ],
    ...restProps,
  };
}
