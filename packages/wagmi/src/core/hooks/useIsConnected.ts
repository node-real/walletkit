import { useAccount } from 'wagmi';

export function useIsConnected() {
  const { address } = useAccount();
  return !!address;
}
