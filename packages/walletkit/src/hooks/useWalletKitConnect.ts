import { useWalletKit } from '@/components/WalletKitProvider/context';
import { commonErrorHandler } from '@/utils/common';
import { useConnect } from 'wagmi';
import { ConnectErrorType } from 'wagmi/actions';

export type UseWalletKitConnectProps = Parameters<typeof useConnect>[0];
export type UseWalletKitConnectReturnType = ReturnType<typeof useConnect>;

export function useWalletKitConnect(
  props?: UseWalletKitConnectProps,
): UseWalletKitConnectReturnType {
  const { log, options } = useWalletKit();

  const connectProps = {
    chainId: options?.initialChainId,
  };

  const { connect, connectAsync, connectors, ...restProps } = useConnect({
    ...props,
    mutation: {
      ...props?.mutation,
      onError(error: ConnectErrorType, ...params) {
        commonErrorHandler({
          log,
          handler: options.onError,
          error,
        });
        props?.mutation?.onError?.(error, ...params);
      },
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
    ...restProps,
  };
}
