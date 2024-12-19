import React, { useContext } from 'react';

export interface SwitchNetworkModalOpenOptions {
  isClosable?: boolean;
}

export interface SwitchNetworkModalContextProps {
  isOpen: boolean;
  isClosable: boolean;
  onClose: () => void;
  onOpen: (options?: SwitchNetworkModalOpenOptions) => void;
}

export const SwitchNetworkModalContext = React.createContext({} as SwitchNetworkModalContextProps);

export function useSwitchNetworkModal() {
  return useContext(SwitchNetworkModalContext);
}
