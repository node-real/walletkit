import { useConnector } from '@/hooks/useConnector';
import { commonErrorHandler } from '@/utils/common';
import { WALLET_CONNECT_ID } from '@/wallets';
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
  const { connectAsync } = useConnect();
  const { isConnected } = useAccount();

  const { log, options } = useWalletKitContext();
  const connector = useConnector(WALLET_CONNECT_ID);
  const [wcUri, setWcUri] = useState<string>('');

  useEffect(() => {
    if (!connector || isConnected || connector?.options.showQrModal) return;

    let provider: any;
    const updateWcUri = async () => {
      provider = await connector.getProvider();
      provider.on('display_uri', setWcUri);
    };
    updateWcUri();

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

          if (error?.code === 4001) {
            connectWallet();
          }
        }, 100);
      }
    };

    connectWallet();

    return () => {
      provider?.off?.('display_uri', setWcUri);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connector, isConnected]);

  const value = useMemo(() => {
    return {
      wcUri,
    };
  }, [wcUri]);

  return (
    <WalletConnectUriContext.Provider value={value}>{children}</WalletConnectUriContext.Provider>
  );
}
