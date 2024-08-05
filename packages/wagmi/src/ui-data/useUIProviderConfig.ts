import { useWalletKit } from '@/core/components/WalletKitProvider/context';
import { useIsConnected } from '@/core/hooks/useIsConnected';
import { DataSource } from '@/ui/types';

export function useUIProviderConfig(): ReturnType<DataSource['useProvider']> {
  const isConnected = useIsConnected();
  const { selectedConnector } = useWalletKit();

  return {
    walletId: selectedConnector?.id,
    isConnected,
  };
}
