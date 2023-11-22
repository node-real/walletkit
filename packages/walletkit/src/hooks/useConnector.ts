import { useConnect, Connector } from 'wagmi';

export function useConnector(id: string) {
  const { connectors } = useConnect();
  return connectors.find((c) => c.id === id) as Connector | undefined;
}
