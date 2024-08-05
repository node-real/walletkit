import { useAccount, useConfig } from 'wagmi';

export function useChainIsSupported() {
  const { chain, address } = useAccount();
  const { chains } = useConfig();

  return !!address && !!chains.find((item) => item.id === chain?.id);
}
