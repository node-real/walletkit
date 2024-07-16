import { useWalletKit } from '@/components/WalletKitProvider/context';
import { commonErrorHandler } from '@/utils/common';
import { useSwitchChain } from 'wagmi';
import { SwitchChainErrorType } from 'wagmi/actions';

export type UseWalletKitSwitchChainProps = Parameters<typeof useSwitchChain>[0];

export function useWalletKitSwitchChain(props?: UseWalletKitSwitchChainProps) {
  const { log, options } = useWalletKit();

  const result = useSwitchChain({
    ...props,
    mutation: {
      ...props?.mutation,
      onError(error: SwitchChainErrorType, ...params) {
        commonErrorHandler({
          log,
          handler: options.onError,
          error,
        });
        props?.mutation?.onError?.(error, ...params);
      },
    },
  });

  return result;
}
