import { commonErrorHandler } from '@/utils/common';
import { walletConnect } from '@/wallets';
import { useEffect, useMemo, useState } from 'react';
import { useConnect, useAccount } from 'wagmi';
import { useWalletKitContext } from '../WalletKitProvider/context';
import { WalletConnectUriContext } from './context';

export interface WalletConnectUriProviderProps {
  children: React.ReactNode;
}

let timer: any = 0;

export function WalletConnectUriProvider(props: WalletConnectUriProviderProps) {
  const { children } = props;

  /**
   * Don't use `useWalletKitConnect`
   * otherwise when user repeats go and back between the wallet list and QR code page
   * due to the following `connectAsync` logic, multiple errors will be thrown
   */
  const { connectAsync, connectors } = useConnect();
  const { isConnected } = useAccount();

  const { log, options } = useWalletKitContext();
  const [wcUri, setWcUri] = useState<string>('');

  const uriConnector = useMemo(() => {
    const chains = connectors?.[0]?.chains;

    if (chains?.length > 0) {
      return walletConnect({
        connectorOptions: {
          showQrModal: false,
        },
      }).createConnector(chains);
    }
    return null;
  }, [connectors]);

  useEffect(() => {
    if (!uriConnector || isConnected) return;

    let provider: any;
    const updateWcUri = async () => {
      provider = await uriConnector.getProvider();
      provider.on('display_uri', setWcUri);
    };
    updateWcUri();

    const connectWallet = async () => {
      try {
        await connectAsync({ connector: uriConnector });
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

    return () => {
      provider?.off?.('display_uri', setWcUri);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uriConnector, isConnected]);

  const value = useMemo(() => {
    return {
      wcUri,
    };
  }, [wcUri]);

  return (
    <WalletConnectUriContext.Provider value={value}>{children}</WalletConnectUriContext.Provider>
  );
}
