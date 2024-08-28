import { useSolanaConfig } from '@/core/providers/WalletKitProvider/context';
import { EventEmitter } from '@/core/utils/eventEmitter';
import {
  ConnectionProvider,
  WalletProvider,
  WalletProviderProps,
} from '@solana/wallet-adapter-react';
import { useCallback } from 'react';

export interface SolanaWalletProviderProps {
  children: React.ReactNode;
}

export function SolanaWalletProvider(props: SolanaWalletProviderProps) {
  const { children } = props;

  const solanaConfig = useSolanaConfig();

  const onError = useCallback<Required<WalletProviderProps>['onError']>((error) => {
    EventEmitter.emit(EventEmitter.SOLANA_WALLET_ERROR, error);
  }, []);

  if (!solanaConfig) {
    return <>{children}</>;
  }

  return (
    <ConnectionProvider endpoint={solanaConfig.rpcUrl}>
      <WalletProvider
        wallets={solanaConfig.adapters}
        onError={onError}
        autoConnect={solanaConfig.autoConnect}
      >
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
}
