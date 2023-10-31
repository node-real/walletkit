import { createContext, useContext } from 'react';
import { Connector } from 'wagmi';
import { ChainProps } from '../../chains/types';

export type ConnectVariant = 'add-network' | 'default';

export type WalletErrorProps = {
  description?: string;
  error?: any;
};

export interface WalletKitOptions {
  initialChainId?: number;
  hideNoWalletCTA?: boolean;
  hideOfficialWalletConnectCTA?: boolean;
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

  connectVariant: ConnectVariant;
  setConnectVariant: (variant: ConnectVariant) => void;

  selectedConnector: Connector;
  setSelectedConnector: (connector: Connector) => void;

  log: (...param: any) => void;
}

export const WalletKitContext = createContext({} as WalletKitContextProps);

export function useWalletKitContext() {
  const context = useContext(WalletKitContext);
  return context;
}
