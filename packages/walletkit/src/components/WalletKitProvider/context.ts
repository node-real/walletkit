import { ChainProps } from '@/chains/types';
import { ReactNode, createContext, useContext } from 'react';
import { Connector } from 'wagmi';

export type Action = 'add-network' | undefined;

export type WalletErrorProps = {
  description?: string;
  error?: any;
};

export interface WalletKitOptions {
  initialChainId?: number;
  disclaimer?: ReactNode;
  hideNoWalletCTA?: boolean;
  hideOfficialWalletConnectCTA?: boolean;

  closeModalAfterConnected?: boolean;
  closeModalAfterSwitchingNetwork?: boolean;
  closeModalOnEsc?: boolean;
  closeModalOnOverlayClick?: boolean;

  walletDownloadUrl?: string;
  chainsConfig?: ChainProps[];
  onClickWallet?: (connector: Connector, e?: React.MouseEvent) => undefined | boolean;
  onChainAlreadyAdded?: (connector: Connector, chainId: number) => void;
  onError?: (error: any, description: string) => void;
}

export interface WalletKitContextProps {
  options: WalletKitOptions;
  supportedChains: ChainProps[];
  isMobileLayout: boolean;

  action: Action;
  setAction: (action: Action) => void;

  selectedConnector: Connector;
  setSelectedConnector: (connector: Connector) => void;

  log: (...param: any) => void;
}

export const WalletKitContext = createContext({} as WalletKitContextProps);

export function useWalletKitContext() {
  const context = useContext(WalletKitContext);
  return context;
}
