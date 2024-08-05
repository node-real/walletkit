import { useState, useEffect } from 'react';
import { useConnect } from 'wagmi';
import { useWalletConnectConnector } from './useWalletConnectConnector';
import { useIsConnected } from './useIsConnected';
import { useWalletKit } from '../components/WalletKitProvider/context';
import { getGlobalData } from '../globalData';
import { commonErrorHandler } from '../utils';

let timer: any;

export function useQRCodeUri() {
  const { connectAsync } = useConnect();

  const { log, options } = useWalletKit();
  const [wcUri, setWcUri] = useState<string>('');

  const connector = useWalletConnectConnector();
  const isConnected = useIsConnected();

  useEffect(() => {
    if (isConnected || !connector) return;
    const onUpdateWcUri = ({ type, data }: any) => {
      if (type === 'display_uri' && !getGlobalData().walletConnectModalIsOpen) {
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
          if (error?.code === 4001) {
            commonErrorHandler({
              log,
              error,
              handler: options.onError,
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
