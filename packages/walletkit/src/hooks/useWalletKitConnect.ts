import { commonErrorHandler } from '@/utils/common';
import { useConnect } from 'wagmi';
import { useWalletKitContext } from '..';

export type UseWalletKitConnectProps = Parameters<typeof useConnect>[0];

export function useWalletKitConnect(props?: UseWalletKitConnectProps) {
  const { log, options } = useWalletKitContext();

  const connectProps = {
    chainId: options?.initialChainId,
  };

  const { connect, connectAsync, connectors, ...rest } = useConnect({
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
