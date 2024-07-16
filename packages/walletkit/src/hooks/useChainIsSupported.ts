import { useAccount, useSwitchChain } from 'wagmi';

export function useChainIsSupported() {
  const { chain, address } = useAccount();
  const { chains } = useSwitchChain();

  return !!address && !!chains.find((item) => item.id === chain?.id);
}
