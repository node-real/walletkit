import { commonErrorHandler } from '@/utils/common';
import { useConnect } from 'wagmi';
import { useWalletKitContext } from '..';

export function useWalletKitConnect({ ...props }: any = {}): ReturnType<typeof useConnect> {
  const { log, options } = useWalletKitContext();

  const connectProps = {
    chainId: options?.initialChainId,
  };

  const { connect, connectAsync, connectors, ...rest } = useConnect({
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

  return {
    connect: ({ ...opts }) => {
      return connect({
        ...connectProps,
        ...opts,
      });
    },
    connectAsync: async ({ ...opts }) => {
      return await connectAsync({
        ...connectProps,
        ...opts,
      });
    },
    connectors,
    ...rest,
  };
}
