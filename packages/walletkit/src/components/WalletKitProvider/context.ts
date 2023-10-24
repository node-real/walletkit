import { createContext, useContext } from 'react';
import { Connector } from 'wagmi';
import { ChainProps } from '../../chains/types';
import { Theme } from '../../themes';

export type ConnectMode = 'add-network' | 'default';

export type ColorMode = 'auto' | 'light' | 'dark';

export type WalletErrorProps = {
  description?: string;
  error?: any;
};

export interface WalletKitOptions {
  initialChainId?: number;
  hideNoWalletCTA?: boolean;
  walletDownloadUrl?: string;
  chainsConfig?: ChainProps[];
  onClickWallet?: (connector: Connector, e?: React.MouseEvent) => undefined | boolean;
  onChainAlreadyAdded?: (connector: Connector, chainId: number) => void;
  onError?: (error: any, description: string) => void;
}

export interface WalletKitContextProps {
  options: WalletKitOptions;
  supportedChains: ChainProps[];

  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;

  connectMode: ConnectMode;
  setConnectMode: (mode: ConnectMode) => void;

  selectedConnector: Connector;
  setSelectedConnector: (connector: Connector) => void;

  log: (...param: any) => void;

  customTheme: Theme;
}

export const WalletKitContext = createContext({} as WalletKitContextProps);

export function useWalletKitContext() {
  const context = useContext(WalletKitContext);
  return context;
}
