import { BaseBehavior, BaseWallet } from '@/core/configs/types';
import { WalletProviderProps } from '@solana/wallet-adapter-react';

export type Adapter = WalletProviderProps['wallets'][0];

export interface SolanaWalletBehavior extends BaseBehavior {
  getAdapter?: () => Adapter;
}

export interface SolanaWallet extends BaseWallet<SolanaWalletBehavior> {
  adapterName: string;
}

export interface InjectedSolanaWalletOptions extends Partial<SolanaWallet> {
  adapterOptions?: any;
}
