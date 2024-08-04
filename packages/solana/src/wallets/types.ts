import { WalletConfig } from '@node-real/walletkit-ui';
import { WalletProviderProps } from '@solana/wallet-adapter-react';

export type Adapter = WalletProviderProps['wallets'][0];

export interface WalletProps extends WalletConfig {
  getAdapter: () => Adapter;
}

export interface InjectedWalletOptions extends Partial<WalletProps> {
  adapterOptions?: any;
}
