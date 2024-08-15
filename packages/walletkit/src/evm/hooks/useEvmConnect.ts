import { useConfig, useLogger, useWalletSetting } from '@/core/providers/WalletKitProvider/context';
import { useConnect } from 'wagmi';
import { ConnectErrorType } from 'wagmi/actions';
import { evmCommonErrorHandler } from '../utils/evmCommonErrorHandler';

export type UseEvmConnectProps = Parameters<typeof useConnect>[0];
export type UseEvmConnectReturnType = ReturnType<typeof useConnect>;

export function useEvmConnect(props?: UseEvmConnectProps): UseEvmConnectReturnType {
  const config = useConfig();
  const log = useLogger();
  const { evm } = useWalletSetting();

  const connectProps = {
    chainId: evm?.initialChainId,
  };

  const { connect, connectAsync, connectors, ...restProps } = useConnect({
    ...props,
    mutation: {
      ...props?.mutation,
      onError(error: ConnectErrorType, ...params) {
        evmCommonErrorHandler({
          log,
          handler: config.events.onError,
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