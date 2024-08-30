import { useWalletKit } from '@/core/providers/WalletKitProvider/context';
import { Config, useConnect } from 'wagmi';
import { ConnectErrorType } from 'wagmi/actions';
import { evmCommonErrorHandler } from '../utils/evmCommonErrorHandler';
import { EventEmitter } from '@/core/utils/eventEmitter';
import { ConnectData } from 'wagmi/query';

export type UseEvmConnectProps = Parameters<typeof useConnect>[0];
export type UseEvmConnectReturnType = ReturnType<typeof useConnect>;

export function useEvmConnect(props?: UseEvmConnectProps): UseEvmConnectReturnType {
  const { log, options, evmConfig } = useWalletKit();

  const connectProps = {
    chainId: evmConfig?.initialChainId,
  };

  const { connect, connectAsync, connectors, ...restProps } = useConnect({
    ...props,
    mutation: {
      ...props?.mutation,
      onSettled(data: ConnectData<Config> | undefined, error: ConnectErrorType | null, ...params) {
        EventEmitter.emit(EventEmitter.EVM_CONNECT_SETTLE, error);
        props?.mutation?.onSettled?.(data, error, ...params);
      },
      onError(error: ConnectErrorType, ...params) {
        EventEmitter.emit(EventEmitter.EVM_CONNECT_ERROR, error);
        evmCommonErrorHandler({
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
