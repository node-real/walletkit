import { useConnectors } from 'wagmi';

export function useWalletConnector(id: string) {
  const connectors = useConnectors();
  return connectors.find((item) => item.id === id);
}
