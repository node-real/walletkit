import { useState, useEffect } from 'react';

import { Connector, useAccount } from 'wagmi';
import { useWalletKitContext } from '..';
import { useWalletKitConnect } from './useWalletKitConnect';
import { useConnector } from './useConnectors';
import { WALLET_CONNECT_ID } from '../wallets';

export function useWalletConnectUri() {
  const { log } = useWalletKitContext();

  const [wcUri, setWcUri] = useState<string>('');

  const connector = useConnector(WALLET_CONNECT_ID);
  const { connectAsync } = useWalletKitConnect();
  const { isConnected } = useAccount();

  useEffect(() => {
    if (!connector || wcUri || isConnected) return;

    async function handleMessage({ type, data }: any) {
      if (type === 'display_uri') {
        setWcUri(data);
      }
    }

    async function handleChange(e: any) {
      log('WC Change', e);
    }
    async function handleDisconnect() {
      log('WC Disconnect');
    }
    async function handleConnect() {
      log('WC Connect');
    }
    async function handleError(e: any) {
      log('WC Error', e);
    }

    async function connectWallet(connector: Connector) {
      const result = await connectAsync({ connector });
      if (result) return result;
      return false;
    }

    async function connectWalletConnect(connector: Connector) {
      try {
        await connectWallet(connector);
      } catch (error: any) {
        log('catch error');
        log(error);

        if (error.code) {
          switch (error.code) {
            case 4001:
              log('error.code - User rejected');
              connectWalletConnect(connector); // Regenerate QR code
              break;
            default:
              log('error.code - Unknown Error');
              break;
          }
        } else {
          // Sometimes the error doesn't respond with a code
          log('WalletConnect cannot connect.', error);
        }
      }
    }

    connectWalletConnect(connector);

    connector.on('message', handleMessage);
    connector.on('change', handleChange);
    connector.on('connect', handleConnect);
    connector.on('disconnect', handleDisconnect);
    connector.on('error', handleError);
    return () => {
      console.log('wallet connect');

      connector.off('message', handleMessage);
      connector.off('change', handleChange);
      connector.off('connect', handleConnect);
      connector.off('disconnect', handleDisconnect);
      connector.off('error', handleError);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connector, isConnected]);

  return {
    wcUri,
  };
}
