import { BaseWallet } from '@/core/configs/types';
import { WalletProviderProps } from '@solana/wallet-adapter-react';

export type Adapter = WalletProviderProps['wallets'][0];

export interface SolanaWallet extends BaseWallet {
  adapterName: string;
  getDeepLink: () => string | undefined;
  getAdapter: () => Adapter;
}

export interface InjectedSolanaWalletOptions extends Partial<SolanaWallet> {
  adapterOptions?: any;
}
