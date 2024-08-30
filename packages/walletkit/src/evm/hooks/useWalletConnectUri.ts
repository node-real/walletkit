import { useWalletKit } from '@/core/providers/WalletKitProvider/context';
import { useEffect, useState } from 'react';
import { useIsConnected } from './useIsConnected';
import { useWalletConnectConnector } from './useWalletConnectConnector';
import { useEvmConnect } from './useEvmConnect';

interface UseWalletConnectUriProps {
  enabled?: boolean;
  refreshUriOnError?: boolean;
}

let timer: any;

export function useWalletConnectUri(props: UseWalletConnectUriProps = {}) {
  const { enabled = true, refreshUriOnError = true } = props;

  const { connectAsync } = useEvmConnect();
  const { log } = useWalletKit();

  const connector = useWalletConnectConnector();
  const isConnected = useIsConnected();

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
        log('[WcUri]', 'connecting');
        const provider: any = await connector?.getProvider();

        provider.rpc.showQrModal = false;

        await connectAsync({ connector });
      } catch (error: any) {
        clearTimeout(timer);

        timer = setTimeout(() => {
          if (error?.code === 4001 && refreshUriOnError) {
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
  }, [isConnected, enabled, refreshUriOnError]);

  return {
    wcUri,
  };
}
