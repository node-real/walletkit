import { useWalletSetting } from '@/core/providers/WalletKitProvider/context';
import { EventEmitter } from '@/core/utils/eventEmitter';
import { getSolanaConfig } from '@/solana/utils/getSolanaConfig';
import {
  ConnectionProvider,
  WalletProvider,
  WalletProviderProps,
} from '@solana/wallet-adapter-react';
import { useCallback, useMemo } from 'react';

export interface SolanaWalletProviderProps {
  children: React.ReactNode;
}

export function SolanaWalletProvider(props: SolanaWalletProviderProps) {
  const { children } = props;

  const { autoConnect, solana } = useWalletSetting();

  const config = useMemo(() => {
    if (!solana) return;
    return getSolanaConfig(solana);
  }, [solana]);

  const onError = useCallback<Required<WalletProviderProps>['onError']>((error) => {
    EventEmitter.emit(EventEmitter.WalletError, error);
  }, []);

  if (!config) {
    return <>{children}</>;
  }

  return (
    <ConnectionProvider endpoint={config.rpcUrl}>
      <WalletProvider wallets={config.adapters} onError={onError} autoConnect={autoConnect}>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
}
