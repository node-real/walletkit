import { CONNECT_STATUS } from '@/core/constants';
import { TemplateConnectingView } from '@/core/modals/ConnectModal/TemplateConnectingView';
import { useWalletKit } from '@/core/providers/WalletKitProvider/context';
import { EventEmitter } from '@/core/utils/eventEmitter';
import { tronCommonErrorHandler } from '@/tron/utils/tronCommonErrorHandler';
import { TronWallet } from '@/tron/wallets';
import { AdapterName } from '@tronweb3/tronwallet-abstract-adapter';
import { useWallet, WalletProviderProps } from '@tronweb3/tronwallet-adapter-react-hooks';
import { useCallback, useEffect, useState } from 'react';

type WalletError = Parameters<Required<WalletProviderProps>['onError']>[0];

export function TronConnectingView() {
  const { log, selectedWallet, options, tronConfig } = useWalletKit();

  const [status, setStatus] = useState(
    selectedWallet.isInstalled() ? CONNECT_STATUS.CONNECTING : CONNECT_STATUS.UNAVAILABLE,
  );

  const { select, wallets: adapters, connected } = useWallet();

  useEffect(() => {
    const onError = (error: WalletError) => {
      let message = '';

      if (error.message.includes('rejected')) {
        message = 'User rejected the request';
        setStatus(CONNECT_STATUS.REJECTED);
      } else {
        setStatus(CONNECT_STATUS.FAILED);
      }

      tronCommonErrorHandler({
        log,
        handler: options.onError,
        error: {
          message,
        },
      });
    };

    EventEmitter.on(EventEmitter.TRON_WALLET_ERROR, onError);
    return () => {
      EventEmitter.off(EventEmitter.TRON_WALLET_ERROR, onError);
    };
  }, [options.onError, log]);

  const runConnect = useCallback(async () => {
    if (!selectedWallet.isInstalled()) return;
    setStatus(CONNECT_STATUS.CONNECTING);

    select((selectedWallet as TronWallet).adapterName as AdapterName);

    if (!tronConfig?.autoConnect) {
      const adapter = adapters.find(
        (item) => item.adapter.name === (selectedWallet as TronWallet).adapterName,
      )?.adapter;

      if (adapter) {
        await adapter.connect();
      }
    }
  }, [adapters, select, selectedWallet, tronConfig]);

  return (
    <TemplateConnectingView
      status={status}
      runConnect={runConnect}
      onTryAgain={runConnect}
      wallet={selectedWallet}
      isConnected={connected}
    />
  );
}
