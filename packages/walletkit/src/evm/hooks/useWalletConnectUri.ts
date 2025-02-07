import { useWalletKit } from '@/core/providers/WalletKitProvider/context';
import { useEffect, useState } from 'react';
import { useIsConnected } from './useIsConnected';
import { useWalletConnectConnector } from './useWalletConnectConnector';
import { useEvmConnect } from './useEvmConnect';

interface UseWalletConnectUriProps {
  enabled?: boolean;
  refreshUriOnError?: boolean;
}

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
      log('[useWalletConnectUri] display_uri', data);
      if (type === 'display_uri') {
        setWcUri(data);
      }
    };

    const connectWallet = async () => {
      try {
        const provider: any = await connector?.getProvider();

        provider.rpc.showQrModal = false;

        await connectAsync({ connector });
      } catch (error: any) {
        log('[useWalletConnectUri] error', error?.code, error);
        if (
          (error?.code === 4001 ||
            error?.message?.includes('User disapproved requested methods')) &&
          refreshUriOnError
        ) {
          log('[useWalletConnectUri] refresh');
          connectWallet(); // refresh qr code
        }
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
