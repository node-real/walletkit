import { useWalletKit } from '@/core/components/WalletKitProvider/context';
import { commonErrorHandler } from '@/core/utils';
import { EventEmitter } from '@/core/utils/eventEmitter';
import { CONNECT_STATUS } from '@/ui/constants';
import { DataSource } from '@/ui/types';
import { useWallet, WalletProviderProps } from '@solana/wallet-adapter-react';
import { useCallback, useEffect, useState } from 'react';

type WalletError = Parameters<Required<WalletProviderProps>['onError']>[0];

export function useUIConnectingView(): ReturnType<DataSource['useConnectingView']> {
  const { selectedWallet, log, options, autoConnect } = useWalletKit();

  const [status, setStatus] = useState(
    selectedWallet.isInstalled() ? CONNECT_STATUS.CONNECTING : CONNECT_STATUS.UNAVAILABLE,
  );

  const { select, wallets: adapters } = useWallet();

  useEffect(() => {
    const onError = (error: WalletError) => {
      let message = '';

      if (error.message.includes('Error Calling Method: requestAccounts')) {
        message = 'User rejected request';
        setStatus(CONNECT_STATUS.REJECTED);
      } else {
        setStatus(CONNECT_STATUS.FAILED);
      }

      commonErrorHandler({
        log,
        handler: options.onError,
        error: {
          message,
        },
      });
    };

    EventEmitter.on(EventEmitter.WalletError, onError);
    return () => {
      EventEmitter.off(EventEmitter.WalletError, onError);
    };
  }, [log, options.onError]);

  const runConnect = useCallback(async () => {
    if (!selectedWallet.isInstalled()) return;

    select(selectedWallet.adapterName as any);

    if (!autoConnect) {
      const adapter = adapters.find(
        (item) => item.adapter.name === selectedWallet.adapterName,
      )?.adapter;
      if (adapter) {
        await adapter.connect();
      }
    }
  }, [adapters, autoConnect, select, selectedWallet]);

  return {
    isWalletConflict: false,
    status,
    onClickTryAgain: runConnect,
    runConnect,
  };
}
