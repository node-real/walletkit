import React, { useContext } from 'react';

export interface WalletConnectUriContextProps {
  wcUri: string;
}

export const WalletConnectUriContext = React.createContext({} as WalletConnectUriContextProps);

export function useWalletConnectUri() {
  const context = useContext(WalletConnectUriContext);
  return context;
}
