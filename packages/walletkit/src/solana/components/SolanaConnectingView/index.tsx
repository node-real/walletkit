import { CONNECT_STATUS } from '@/core/constants';
import { ConnectingView } from '@/core/modals/ConnectModal/ConnectingView';
import {
  useConfig,
  useLogger,
  useSelectedWallet,
  useWalletSetting,
} from '@/core/providers/WalletKitProvider/context';
import { EventEmitter } from '@/core/utils/eventEmitter';
import { solanaCommonErrorHandler } from '@/solana/utils/solanaCommonErrorHandler';
import { SolanaWallet } from '@/solana/wallets';
import { useWallet, WalletProviderProps } from '@solana/wallet-adapter-react';
import { useCallback, useEffect, useState } from 'react';

type WalletError = Parameters<Required<WalletProviderProps>['onError']>[0];

export function SolanaConnectingView() {
  const log = useLogger();
  const { selectedWallet } = useSelectedWallet();
  const config = useConfig();

  const { autoConnect } = useWalletSetting();

  const [status, setStatus] = useState(
    selectedWallet.isInstalled() ? CONNECT_STATUS.CONNECTING : CONNECT_STATUS.UNAVAILABLE,
  );

  const { select, wallets: adapters, connected: isConnected } = useWallet();

  useEffect(() => {
    const onError = (error: WalletError) => {
      let message = '';

      if (
        error.message.includes('Error Calling Method: requestAccounts') ||
        error.message.includes('User rejected the request')
      ) {
        message = 'User rejected the request';
        setStatus(CONNECT_STATUS.REJECTED);
      } else {
        setStatus(CONNECT_STATUS.FAILED);
      }

      solanaCommonErrorHandler({
        log,
        handler: config.events.onError,
        error: {
          message,
        },
      });
    };

    EventEmitter.on(EventEmitter.WalletError, onError);
    return () => {
      EventEmitter.off(EventEmitter.WalletError, onError);
    };
  }, [config.events.onError, log]);

  const runConnect = useCallback(async () => {
    if (!selectedWallet.isInstalled()) return;

    select((selectedWallet as SolanaWallet).adapterName as any);

    if (!autoConnect) {
      const adapter = adapters.find(
        (item) => item.adapter.name === (selectedWallet as SolanaWallet).adapterName,
      )?.adapter;
      if (adapter) {
        await adapter.connect();
      }
    }
  }, [adapters, autoConnect, select, selectedWallet]);

  return (
    <ConnectingView
      status={status}
      runConnect={runConnect}
      wallet={selectedWallet}
      isConnected={isConnected}
    />
  );
}
