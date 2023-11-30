import { useWalletKitContext } from '@/components/WalletKitProvider/context';
import { getGlobalData } from '@/globalData';
import { commonErrorHandler } from '@/utils/common';
import { useState, useEffect } from 'react';
import { useAccount, useConnect } from 'wagmi';

let timer: any;

export function useQRCodeUri() {
  const { connectAsync } = useConnect();
  const { isConnected } = useAccount();

  const { log, options } = useWalletKitContext();
  const [wcUri, setWcUri] = useState<string>('');

  useEffect(() => {
    const connector = getGlobalData().walletConnectConnector;
    if (isConnected || !connector) return;

    const onUpdateWcUri = ({ type, data }: any) => {
      if (type === 'display_uri' && !getGlobalData().walletConnectModalIsOpen) {
        setWcUri(data);
      }
    };

    const connectWallet = async () => {
      try {
        log('[qrcode uri]', 'connecting');
        const provider = await connector?.getProvider();
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

    connector.on('message', onUpdateWcUri);
    return () => {
      connector?.off?.('message', onUpdateWcUri);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  return wcUri;
}
