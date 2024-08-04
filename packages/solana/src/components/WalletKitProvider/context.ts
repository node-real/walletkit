import { Adapter, WalletProps } from '@/wallets';
import { Action, DataSource } from '@node-real/walletkit-ui';
import { createContext, useContext } from 'react';

type BaseOptions = DataSource['options'];

export type WalletErrorProps = {
  description?: string;
  error?: any;
};

export interface WalletKitOptions extends BaseOptions {
  onClickWallet?: (wallet: WalletProps, e?: React.MouseEvent) => undefined | boolean;
}

export interface WalletKitContextProps {
  log: (...param: any) => void;
  options: WalletKitOptions;
  wallets: WalletProps[];

  action: Action;
  setAction: (action: Action) => void;

  selectedWallet: WalletProps;
  setSelectedWallet: (wallet: WalletProps) => void;

  rpcUrl: string;
  autoConnect: boolean;
  adapters: Adapter[];
}

export const WalletKitContext = createContext({} as WalletKitContextProps);

export function useWalletKit() {
  return useContext(WalletKitContext);
}
