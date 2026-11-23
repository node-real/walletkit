import { Action } from '@/components/WalletKitProvider/context';
import React, { useContext } from 'react';
import type { IOSRisk } from '../iosRisk';

export interface WalletKitModalOpenOptions {
  action?: Action;
  route?: string;
}

export interface WalletKitModalContextProps {
  isOpen: boolean;
  iosRisk: IOSRisk | null | undefined;
  checkIOSRisk: () => void;
  acknowledgeIOSRisk: () => void;
  onClose: () => void;
  onOpen: (options?: WalletKitModalOpenOptions) => void;
}

export const WalletKitModalContext = React.createContext({} as WalletKitModalContextProps);

export function useWalletKitModal() {
  return useContext(WalletKitModalContext);
}
