import React, { useContext } from 'react';
import { Action } from '../WalletKitProvider/context';

export interface OpenSwitchNetworkOptions {
  isClosable?: boolean;
}

export interface OpenOptions {
  action?: Action;
}

export interface ModalContextProps {
  isClosable: boolean;
  closeOnEsc?: boolean;
  closeOnOverlayClick?: boolean;
  isOpen: boolean;
  onClose: () => void;
  onOpen: (options?: OpenOptions) => void;
  onOpenProfile: () => void;
  onOpenSwitchNetwork: (options?: OpenSwitchNetworkOptions) => void;
}

export const ModalContext = React.createContext({} as ModalContextProps);

export function useModal() {
  const context = useContext(ModalContext);
  return context;
}
