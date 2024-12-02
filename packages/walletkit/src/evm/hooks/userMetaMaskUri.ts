import { useEffect, useState } from 'react';
import { useConnectors } from 'wagmi';
import { metaMask } from '../wallets';
import { useEvmConnect } from './useEvmConnect';

interface UseMetaMaskUriProps {
  enabled?: boolean;
  refreshUriOnError?: boolean;
}

export function useMetaMaskUri(props: UseMetaMaskUriProps) {
  const { enabled, refreshUriOnError = true } = props;

  const [metaMaskUri, setMetaMaskUri] = useState('');
  const connectors = useConnectors();
  const { connectAsync } = useEvmConnect();

  useEffect(() => {
    if (!enabled) return;

    let provider: any;
    const handleQrUri = async () => {
      const connector = connectors.find((e) => e.id === metaMask().id);
      provider = (await connector?.getProvider()) as any;
      if (provider && connector) {
        provider.on('display_uri', setMetaMaskUri);

        const connectWallet = async () => {
          try {
            await connectAsync({
              connector,
            });
          } catch (error: any) {
            if (error?.code === 4001 && refreshUriOnError) {
              connectWallet(); // refresh qr code
            }
          }
        };

        connectWallet();
      }
    };
    handleQrUri();

    return () => {
      provider?.off('display_uri', setMetaMaskUri);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  return {
    metaMaskUri,
  };
}
