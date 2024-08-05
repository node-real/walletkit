import { isWalletConnectConnector } from '@/wallets/index';
import { useConnectors } from 'wagmi';

export function useWalletConnectConnector() {
  const connectors = useConnectors();
  return connectors.find((item) => isWalletConnectConnector(item));
}
