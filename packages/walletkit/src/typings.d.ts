import { Connector as WagmiConnector } from 'wagmi';

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
