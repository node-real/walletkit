import { useAccount } from 'wagmi';

export function useEvmIsConnected() {
  const { address } = useAccount();
  return !!address;
}
