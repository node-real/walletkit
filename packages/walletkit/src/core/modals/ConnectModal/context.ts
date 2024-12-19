import React, { useContext } from 'react';
import { ViewRoutes } from '../../providers/RouteProvider';
import { Action } from '@/core/providers/WalletKitProvider/context';
import { BaseWallet } from '@/core/configs/types';

export interface ConnectModalOpenParams {
  action?: Action;
  viewRoute?: ViewRoutes;
  initialChainId?: number; // TODO
  tronConfig?: {
    initialChainId?: string | number;
  };
  evmConfig?: {
    initialChainId?: number;
  };
  onConnected?: (params: { wallet: BaseWallet }) => void;
}

export interface ConnectModalContextProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: (params?: ConnectModalOpenParams) => void;
}

export const ConnectModalContext = React.createContext({} as ConnectModalContextProps);

export function useConnectModal() {
  return useContext(ConnectModalContext);
}
