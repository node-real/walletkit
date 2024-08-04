import { useWalletKit } from '@/components/WalletKitProvider/context';
import { useWalletKitSwitchChain } from '@/hooks/useWalletKitSwitchChain';
import { DataSource, ClickSwitchChainParams } from '@node-real/walletkit-ui';
import { useRef } from 'react';

export function useSwitchingConfig(): ReturnType<DataSource['useSwitchingConfig']> {
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
