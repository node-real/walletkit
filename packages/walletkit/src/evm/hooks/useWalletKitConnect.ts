import { useWalletKit, useWalletSetting } from '@/core/providers/WalletKitProvider/context';
import { useConnect } from 'wagmi';
import { ConnectErrorType } from 'wagmi/actions';
import { evmCommonErrorHandler } from '../utils/evmCommonErrorHandler';

export type UseWalletKitConnectProps = Parameters<typeof useConnect>[0];
export type UseWalletKitConnectReturnType = ReturnType<typeof useConnect>;

export function useWalletKitConnect(
  props?: UseWalletKitConnectProps,
): UseWalletKitConnectReturnType {
  const { log, config } = useWalletKit();
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
