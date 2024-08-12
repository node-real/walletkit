import { Action } from '@/ui/types';
import React, { useContext } from 'react';
import { ViewRoutes } from './RouteProvider';

export interface ConnectModalOpenParams {
  action?: Action;
  viewRoute?: ViewRoutes;
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
