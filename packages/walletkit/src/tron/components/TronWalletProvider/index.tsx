import { useWalletKit } from '@/core/providers/WalletKitProvider/context';
import { EventEmitter } from '@/core/utils/eventEmitter';
import { WalletProvider, WalletProviderProps } from '@tronweb3/tronwallet-adapter-react-hooks';

import { useCallback } from 'react';

export interface TronWalletProviderProps {
  children: React.ReactNode;
}

export function TronWalletProvider(props: TronWalletProviderProps) {
  const { children } = props;

  const { tronConfig } = useWalletKit();

  const onError = useCallback<Required<WalletProviderProps>['onError']>((error) => {
    EventEmitter.emit(EventEmitter.TRON_WALLET_ERROR, error);
  }, []);

  if (!tronConfig) {
    return <>{children}</>;
  }

  return (
    <WalletProvider
      adapters={tronConfig.adapters}
      autoConnect={tronConfig.autoConnect}
      onError={onError}
    >
      {children}
    </WalletProvider>
  );
}
