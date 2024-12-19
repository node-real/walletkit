import { CONNECT_STATUS } from '@/core/constants';
import { TemplateConnectingView } from '@/core/modals/ConnectModal/TemplateConnectingView';
import { useWalletKit } from '@/core/providers/WalletKitProvider/context';
import { EventEmitter } from '@/core/utils/eventEmitter';
import { useSolanaConnect } from '@/solana/hooks/useSolanaConnect';
import { solanaCommonErrorHandler } from '@/solana/utils/solanaCommonErrorHandler';
import { SolanaWallet } from '@/solana/wallets';
import { WalletProviderProps } from '@solana/wallet-adapter-react';
import { useCallback, useEffect, useState } from 'react';

type WalletError = Parameters<Required<WalletProviderProps>['onError']>[0];

export function SolanaConnectingView() {
  const { log, selectedWallet, options } = useWalletKit();

  const [status, setStatus] = useState(
    selectedWallet.isInstalled() ? CONNECT_STATUS.CONNECTING : CONNECT_STATUS.UNAVAILABLE,
  );

  const { isConnected, connect } = useSolanaConnect();

  useEffect(() => {
    const onError = (error: WalletError) => {
      let message = '';

      if (
        error.message.includes('Error Calling Method: requestAccounts') ||
        error.message.includes('rejected')
      ) {
        message = 'User rejected the request';
        setStatus(CONNECT_STATUS.REJECTED);
      } else {
        setStatus(CONNECT_STATUS.FAILED);
      }

      solanaCommonErrorHandler({
        log,
        handler: options.onError,
        error: {
          message,
        },
      });
    };

    EventEmitter.on(EventEmitter.SOLANA_WALLET_ERROR, onError);
    return () => {
      EventEmitter.off(EventEmitter.SOLANA_WALLET_ERROR, onError);
    };
  }, [options.onError, log]);

  const runConnect = useCallback(async () => {
    if (!selectedWallet.isInstalled()) return;
    setStatus(CONNECT_STATUS.CONNECTING);

    connect({
      adapterName: (selectedWallet as SolanaWallet).adapterName,
    });
  }, [connect, selectedWallet]);

  return (
    <TemplateConnectingView
      status={status}
      runConnect={runConnect}
      onTryAgain={runConnect}
      wallet={selectedWallet}
      isConnected={isConnected}
    />
  );
}
