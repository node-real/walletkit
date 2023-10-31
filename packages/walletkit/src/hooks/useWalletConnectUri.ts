import { useState, useEffect } from 'react';

import { useAccount, useConnect } from 'wagmi';
import { useWalletKitContext } from '..';
import { useConnector } from './useConnectors';
import { WALLET_CONNECT_ID } from '../wallets';
import { commonErrorHandler } from '../utils/common';

/**
 * Don't use `useWalletKitConnect`
 * otherwise when user repeats go and back between the wallet list and QR code page
 * due to the following `connectAsync` logic, multiple errors will be thrown
 */
let timer: any = 0;

export function useWalletConnectUri() {
  const { log, options } = useWalletKitContext();

  const [wcUri, setWcUri] = useState<string | undefined>(undefined);
  const connector = useConnector(WALLET_CONNECT_ID);

  const { connectAsync } = useConnect(); // don't use `useWalletKitConnect`
  const { isConnected } = useAccount();

  useEffect(() => {
    if (!connector || wcUri || isConnected) return;

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

  return {
    wcUri,
  };
}
