import { commonErrorHandler } from '@/utils/common';
import { useSwitchNetwork } from 'wagmi';
import { useWalletKitContext } from '..';

export type UseWalletKitSwitchNetworkProps = Parameters<typeof useSwitchNetwork>[0];
export type UseWalletKitSwitchNetworkReturnType = ReturnType<typeof useSwitchNetwork>;

export function useWalletKitSwitchNetwork(
  props?: UseWalletKitSwitchNetworkProps,
): UseWalletKitSwitchNetworkReturnType {
  const { log, options } = useWalletKitContext();

  const result = useSwitchNetwork({
    ...props,
    onError(error: Error, ...params) {
      commonErrorHandler({
        log,
        handler: options.onError,
        error,
      });
      props?.onError?.(error, ...params);
    },
  });

  return result;
}
