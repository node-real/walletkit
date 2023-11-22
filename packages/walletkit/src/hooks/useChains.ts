import { Chain, useConnect } from 'wagmi';

export function useChains(): Chain[] {
  const { connectors } = useConnect();
  return connectors?.[0]?.chains;
}
