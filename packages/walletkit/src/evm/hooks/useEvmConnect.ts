import {
  useEventConfig,
  useEvmConfig,
  useLogger,
} from '@/core/providers/WalletKitProvider/context';
import { useConnect } from 'wagmi';
import { ConnectErrorType } from 'wagmi/actions';
import { evmCommonErrorHandler } from '../utils/evmCommonErrorHandler';

export type UseEvmConnectProps = Parameters<typeof useConnect>[0];
export type UseEvmConnectReturnType = ReturnType<typeof useConnect>;

export function useEvmConnect(props?: UseEvmConnectProps): UseEvmConnectReturnType {
  const eventConfig = useEventConfig();
  const log = useLogger();

  const { initialChainId } = useEvmConfig();

  const connectProps = {
    chainId: initialChainId,
  };

  const { connect, connectAsync, connectors, ...restProps } = useConnect({
    ...props,
    mutation: {
      ...props?.mutation,
      onError(error: ConnectErrorType, ...params) {
        evmCommonErrorHandler({
          log,
          handler: eventConfig.onError,
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
