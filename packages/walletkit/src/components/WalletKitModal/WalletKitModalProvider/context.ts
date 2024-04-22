import { Action } from '@/components/WalletKitProvider/context';
import React, { useContext } from 'react';

export interface WalletKitModalOpenOptions {
  action?: Action;
  route?: string;
}

export interface WalletKitModalContextProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: (options?: WalletKitModalOpenOptions) => void;
}

export const WalletKitModalContext = React.createContext({} as WalletKitModalContextProps);

export function useWalletKitModal() {
  return useContext(WalletKitModalContext);
}
