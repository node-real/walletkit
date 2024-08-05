import { useWalletKit } from '@/core/components/WalletKitProvider/context';
import { useWalletKitSwitchChain } from '@/core/hooks/useWalletKitSwitchChain';
import { DataSource, ClickSwitchChainParams } from '@/ui/types';
import { useRef } from 'react';

export function useUISwitchingConfig(): ReturnType<DataSource['useSwitchingConfig']> {
  const { chainsConfig } = useWalletKit();

  const onSuccessRef = useRef<any>();
  const { switchChain, isPending } = useWalletKitSwitchChain({
    mutation: {
      onSuccess() {
        onSuccessRef.current?.();
      },
    },
  });

  return {
    chainsConfig,
    isPending,
    onClickSwitchChain: (params: ClickSwitchChainParams) => {
      const { chainId, onSuccess } = params;

      onSuccessRef.current = onSuccess;

      switchChain({
        chainId,
      });
    },
  };
}
