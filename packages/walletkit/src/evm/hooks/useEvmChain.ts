import { useWalletKit } from '@/core/providers/WalletKitProvider/context';
import { useAccount, useChains } from 'wagmi';

export function useEvmChain() {
  const { chain } = useAccount();
  const chains = useChains();
  const { evmConfig } = useWalletKit();

  const isSupported = chains?.find((e) => e.id === chain?.id);
  const displayConfig = evmConfig?.chainDisplayConfigs?.find((e) => e.id === chain?.id);

  return {
    chain,
    chains,
    isSupported,
    displayConfig,
  };
}
