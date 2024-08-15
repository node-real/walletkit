import { useConnectors } from 'wagmi';
import { isWalletConnect } from '../wallets/walletConnect';

export function useWalletConnectConnector() {
  const connectors = useConnectors();
  return connectors.find((item) => isWalletConnect(item.id));
}
