import { useConnectModal } from '@/core/index';
import { useEventConfig, useLogger } from '@/core/providers/WalletKitProvider/context';
import { EventEmitter } from '@/core/utils/eventEmitter';
import { getEvmGlobalData } from '@/evm/globalData';
import { useEvmIsConnected } from '@/evm/hooks/useEvmIsConnected';
import { useWalletConnectConnector } from '@/evm/hooks/useWalletConnectConnector';
import { evmCommonErrorHandler } from '@/evm/utils/evmCommonErrorHandler';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useConnect } from 'wagmi';

interface EvmWalletConnectUriContextProps {
  wcUri: string;
  setWcUri: (uri: string) => void;
}

const EvmWalletConnectUriContext = React.createContext({} as EvmWalletConnectUriContextProps);

export function useEvmWalletConnectUri() {
  return useContext(EvmWalletConnectUriContext);
}

export function EvmWalletConnectUriProvider(props: React.PropsWithChildren) {
  const { children } = props;

  const [wcUri, setWcUri] = useState<string>('');
  const value = useMemo(() => {
    return {
      wcUri,
      setWcUri,
    };
  }, [wcUri]);

  return (
    <EvmWalletConnectUriContext.Provider value={value}>
      {children}
    </EvmWalletConnectUriContext.Provider>
  );
}

export function EvmWalletConnectUriGenerator() {
  const { setWcUri } = useEvmWalletConnectUri();

  const { connectAsync } = useConnect();

  const eventConfig = useEventConfig();
  const log = useLogger();

  const connector = useWalletConnectConnector();
  const isConnected = useEvmIsConnected();
  const { isOpen } = useConnectModal();

  const timerRef = useRef<any>();

  useEffect(() => {
    if (isConnected || !connector) return;
    const onUpdateWcUri = ({ type, data }: any) => {
      if (type === 'display_uri' && !getEvmGlobalData().walletConnectModalIsOpen) {
        setWcUri(data);
      }
    };

    const connectWallet = async () => {
      try {
        log('[qrcode uri]', 'connecting');
        const provider: any = await connector?.getProvider();

        provider.rpc.showQrModal = false;

        await connectAsync({ connector });
      } catch (error: any) {
        clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
          EventEmitter.emit(EventEmitter.EVM_WC_URI_ERROR, error);

          if (error?.code === 4001) {
            evmCommonErrorHandler({
              log,
              error,
              handler: eventConfig.onError,
            });
            connectWallet(); // refresh qr code
          }
        }, 100);
      }
    };

    connectWallet();

    connector.emitter.on('message', onUpdateWcUri);
    return () => {
      connector?.emitter.off?.('message', onUpdateWcUri);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, isOpen]);

  return null;
}
