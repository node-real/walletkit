import { useState, useEffect } from 'react';
import { useConnect } from 'wagmi';
import { useWalletConnectConnector } from './useWalletConnectConnector';
import { useEvmIsConnected } from './useEvmIsConnected';
import { useEventConfig, useLogger } from '@/core/providers/WalletKitProvider/context';
import { evmCommonErrorHandler } from '../utils/evmCommonErrorHandler';
import { getEvmGlobalData } from '../globalData';
import { ConnectErrorType } from 'wagmi/actions';

let timer: any;

interface UseWalletConnectUriProps {
  onError?: (error: ConnectErrorType) => void;
}

export function useWalletConnectUri(props?: UseWalletConnectUriProps) {
  const { connectAsync } = useConnect();

  const eventConfig = useEventConfig();
  const log = useLogger();
  const [wcUri, setWcUri] = useState<string>('');

  const connector = useWalletConnectConnector();
  const isConnected = useEvmIsConnected();

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
        clearTimeout(timer);

        timer = setTimeout(() => {
          props?.onError?.(error);

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
  }, [isConnected]);

  return wcUri;
}
