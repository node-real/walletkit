import {
  useEvmConfig,
  useEventConfig,
  useLogger,
} from '@/core/providers/WalletKitProvider/context';
import { EventEmitter } from '@/core/utils/eventEmitter';
import { useEffect, useState } from 'react';
import { useConnect } from 'wagmi';
import { evmCommonErrorHandler } from '../utils/evmCommonErrorHandler';
import { useEvmIsConnected } from './useEvmIsConnected';
import { useWalletConnectConnector } from './useWalletConnectConnector';

interface UseEvmWalletConnectUriProps {
  enabled?: boolean;
}

let timer: any;

export function useEvmWalletConnectUri(props: UseEvmWalletConnectUriProps = {}) {
  const { enabled = true } = props;

  const { connectAsync } = useConnect();
  const { initialChainId } = useEvmConfig();
  const eventConfig = useEventConfig();
  const log = useLogger();

  const connector = useWalletConnectConnector();
  const isConnected = useEvmIsConnected();

  const [wcUri, setWcUri] = useState<string>();

  useEffect(() => {
    if (isConnected || !connector || !enabled) return;

    const onUpdateWcUri = ({ type, data }: any) => {
      if (type === 'display_uri') {
        setWcUri(data);
      }
    };

    const connectWallet = async () => {
      try {
        log('[qrcode uri]', 'connecting');
        const provider: any = await connector?.getProvider();

        provider.rpc.showQrModal = false;

        await connectAsync({ connector, chainId: initialChainId });
      } catch (error: any) {
        clearTimeout(timer);

        timer = setTimeout(() => {
          // props?.onError?.(error);

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
      connector?.emitter.off('message', onUpdateWcUri);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, enabled]);

  return {
    wcUri,
  };
}
