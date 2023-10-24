import { Chain } from 'wagmi';
import { useConnectors } from './useConnectors';

export function useChains(): Chain[] {
  const connectors = useConnectors();
  return connectors?.[0]?.chains;
}
