import { useWalletKit } from '@/core/providers/WalletKitProvider/context';
import { EventEmitter } from '@/core/utils/eventEmitter';
import { WalletProvider, WalletProviderProps } from '@tronweb3/tronwallet-adapter-react-hooks';

import { useCallback, useMemo } from 'react';

export interface TronWalletProviderProps {
  children: React.ReactNode;
}

export function TronWalletProvider(props: TronWalletProviderProps) {
  const { children } = props;

  const { tronConfig } = useWalletKit();

  // Remove local cache to force disconnect tron wallet
  useMemo(() => {
    try {
      if (typeof window !== 'undefined' && !tronConfig?.autoConnect) {
        window.localStorage.removeItem('tronAdapterName');
      }
    } catch (err) {
      console.log(err);
    }
  }, [tronConfig?.autoConnect]);

  const onError = useCallback<Required<WalletProviderProps>['onError']>((error) => {
    EventEmitter.emit(EventEmitter.TRON_WALLET_ERROR, error);
  }, []);

  if (!tronConfig) {
    return <>{children}</>;
  }

  return (
    <WalletProvider
      adapters={tronConfig.adapters}
      // autoConnect={tronConfig.autoConnect}
      // Once connected to a wallet, the adapter will alway automatically connect to it after refreshing page
      autoConnect={false}
      onError={onError}
    >
      {children}
    </WalletProvider>
  );
}
