import { DataSource } from '@/ui/types';
import { useConnect, useDisconnect } from 'wagmi';

export function useUIDisconnectButton(): ReturnType<DataSource['useDisconnectButton']> {
  const { reset } = useConnect();
  const { disconnect } = useDisconnect();

  return {
    onClick() {
      disconnect();
      reset();
    },
  };
}
