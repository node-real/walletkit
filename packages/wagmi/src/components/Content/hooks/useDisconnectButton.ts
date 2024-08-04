import { DataSource } from '@node-real/walletkit-ui';
import { useConnect, useDisconnect } from 'wagmi';

export function useDisconnectButton(): ReturnType<DataSource['useDisconnectButton']> {
  const { reset } = useConnect();
  const { disconnect } = useDisconnect();

  return {
    onClick() {
      disconnect();
      reset();
    },
  };
}
