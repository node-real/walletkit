import { Action } from '@/components/WalletKitProvider/context';
import React, { useContext } from 'react';

export interface ConnectModalOpenOptions {
  action?: Action;
  route?: string;
}

export interface ConnectModalContextProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: (options?: ConnectModalOpenOptions) => void;
}

export const ConnectModalContext = React.createContext({} as ConnectModalContextProps);

export function useConnectModal() {
  return useContext(ConnectModalContext);
}
