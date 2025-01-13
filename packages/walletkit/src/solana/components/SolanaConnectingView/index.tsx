import { CONNECT_STATUS } from '@/core/constants';
import { TemplateConnectingView } from '@/core/modals/ConnectModal/TemplateConnectingView';
import { useWalletKit } from '@/core/providers/WalletKitProvider/context';
import { getWalletBehaviorOnPlatform } from '@/core/utils/common';
import { EventEmitter } from '@/core/utils/eventEmitter';
import { useSolanaConnect } from '@/solana/hooks/useSolanaConnect';
import { solanaCommonErrorHandler } from '@/solana/utils/solanaCommonErrorHandler';
import { SolanaWallet, SolanaWalletBehavior } from '@/solana/wallets';
import { useWallet, WalletProviderProps } from '@solana/wallet-adapter-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

type WalletError = Parameters<Required<WalletProviderProps>['onError']>[0];

export function SolanaConnectingView() {
  const { log, selectedWallet, options } = useWalletKit();

  const behavior = useMemo(() => {
    return getWalletBehaviorOnPlatform<SolanaWalletBehavior>(selectedWallet);
  }, [selectedWallet]);

  const [status, setStatus] = useState(
    behavior?.isInstalled?.() ? CONNECT_STATUS.CONNECTING : CONNECT_STATUS.UNAVAILABLE,
  );

  const { isConnected, connect } = useSolanaConnect();
  const { publicKey } = useWallet();

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
    if (!behavior?.isInstalled?.()) return;
    setStatus(CONNECT_STATUS.CONNECTING);

    connect({
      adapterName: (selectedWallet as SolanaWallet).adapterName,
    });
  }, [behavior, connect, selectedWallet]);

  return (
    <TemplateConnectingView
      status={status}
      runConnect={runConnect}
      onTryAgain={runConnect}
      wallet={selectedWallet}
      isConnected={isConnected}
      address={publicKey?.toBase58()}
    />
  );
}
