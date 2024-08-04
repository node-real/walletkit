import { useWalletKit } from '@/components/WalletKitProvider/context';
import { useIsConnected } from '@/hooks/useIsConnected';
import { DataSource } from '@node-real/walletkit-ui';

export function useProviderConfig(): ReturnType<DataSource['useProvider']> {
  const isConnected = useIsConnected();
  const { selectedConnector } = useWalletKit();

  return {
    walletId: selectedConnector?.id,
    isConnected,
  };
}
