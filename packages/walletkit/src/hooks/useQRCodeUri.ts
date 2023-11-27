import { useWalletKitContext } from '@/components/WalletKitProvider/context';
import { getGlobalData } from '@/globalData';
import { commonErrorHandler } from '@/utils/common';
import { useState, useEffect } from 'react';
import { useAccount, useConnect } from 'wagmi';

let lastWcUri: string;
let timer: any;

export function useQRCodeUri() {
  const { connectAsync } = useConnect();
  const { isConnected } = useAccount();

  const { log, options } = useWalletKitContext();
  const [wcUri, setWcUri] = useState<string>('');

  useEffect(() => {
    const { qrCodeWalletConnectConnector: connector } = getGlobalData();
    if (isConnected || !connector) return;

    const onUpdateWcUri = ({ type, data }: any) => {
      if (type === 'display_uri') {
        lastWcUri = data;
        setWcUri(data);
      }
    };

    const connectWallet = async () => {
      try {
        await connectAsync({ connector });
      } catch (error: any) {
        clearTimeout(timer);

        timer = setTimeout(() => {
          commonErrorHandler({
            log,
            error,
            handler: options.onError,
          });
          connectWallet(); // refresh qr code
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
