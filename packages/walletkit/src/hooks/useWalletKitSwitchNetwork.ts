import { commonErrorHandler } from '@/utils/common';
import { useSwitchNetwork } from 'wagmi';
import { useWalletKitContext } from '..';

export function useWalletKitSwitchNetwork({ ...props }: any = {}): ReturnType<
  typeof useSwitchNetwork
> {
  const { log, options } = useWalletKitContext();

  const result = useSwitchNetwork({
    ...props,
    onError(error: any) {
      commonErrorHandler({
        log,
        handler: options.onError,
        error,
      });
      props?.onError?.(error);
    },
  });

  return result;
}
