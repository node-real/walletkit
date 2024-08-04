import { WalletProps } from '@/wallets';
import { Action, ChainConfig, DataSource } from '@node-real/walletkit-ui';
import { createContext, useContext } from 'react';
import { Connector } from 'wagmi';

type BaseOptions = DataSource['options'];

export type WalletErrorProps = {
  description?: string;
  error?: any;
};

export interface WalletKitOptions extends BaseOptions {
  initialChainId?: number;
  chainsConfig?: ChainConfig[];

  onClickWallet?: (wallet: WalletProps, e?: React.MouseEvent) => undefined | boolean;
  onChainAlreadyAdded?: (wallet: WalletProps, chainId: number) => void;
}

export interface WalletKitContextProps {
  log: (...param: any) => void;
  options: WalletKitOptions;
  wallets: WalletProps[];
  chainsConfig: ChainConfig[];

  action: Action;
  setAction: (action: Action) => void;

  selectedConnector: Connector;
  setSelectedConnector: (connector: Connector) => void;
}

export const WalletKitContext = createContext({} as WalletKitContextProps);

export function useWalletKit() {
  return useContext(WalletKitContext);
}
