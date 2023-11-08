import React, { useContext } from 'react';

export interface OpenSwitchNetworkOptions extends React.MouseEvent {
  isClosable?: boolean;
}

export interface ModalContextProps {
  isClosable: boolean;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  onOpenProfile: () => void;
  onOpenSwitchNetwork: (options?: OpenSwitchNetworkOptions) => void;
}

export const ModalContext = React.createContext({} as ModalContextProps);

export function useModal() {
  const context = useContext(ModalContext);
  return context;
}
