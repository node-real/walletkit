import { useSwitchNetwork } from 'wagmi';
import { useWalletKitContext } from '../components/WalletKitProvider/context';
import { commonErrorHandler } from '../utils/common';

export function useWalletKitSwitchNetwork({ ...props }: any = {}): ReturnType<
  typeof useSwitchNetwork
> {
  const { log } = useWalletKitContext();

  const result = useSwitchNetwork({
    ...props,
    onError(error: any) {
      commonErrorHandler(log, error);
      props?.onError?.(error);
    },
  });

  return result;
}
