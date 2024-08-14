import { useConnectors } from 'wagmi';
import { walletConnectConfig } from '@/core/configs/wallets/walletConnect';

export function useWalletConnectConnector() {
  const connectors = useConnectors();
  return connectors.find((item) => item.id === walletConnectConfig.id);
}
