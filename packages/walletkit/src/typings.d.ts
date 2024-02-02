import { Connector as WagmiConnector } from 'wagmi';

import type { InjectedProviderFlags as WagmiInjectedProviderFlags } from 'wagmi/window';

import { WalletProps } from './wallets/types';

declare global {
  interface Window {
    ethereum: any;
    trustWallet: any;
    trustwallet: any;
    tokenpocket: any;
    okexchain: any;
  }
}

declare module 'wagmi' {
  export interface Connector extends WagmiConnector {
    _wallet: WalletProps;
  }
}

declare module 'wagmi/window' {
  type InjectedProviderFlags = WagmiInjectedProviderFlags & {
    isBinance?: string | undefined;
  };
}
