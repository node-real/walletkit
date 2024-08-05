import { Action } from '@/ui/types';
import React, { useContext } from 'react';

export interface ConnectModalOpenParams {
  action?: Action;
  route?: string;
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
