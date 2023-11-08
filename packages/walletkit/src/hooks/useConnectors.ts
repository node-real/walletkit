import { useConnect } from 'wagmi';

export function useConnectors() {
  const { connectors } = useConnect();
  return connectors;
}

export function useConnector(id: string) {
  const connectors = useConnectors();
  return connectors.find((c) => c.id === id);
}
