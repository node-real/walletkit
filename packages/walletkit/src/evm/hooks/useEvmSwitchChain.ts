import { useWalletKit } from '@/core/providers/WalletKitProvider/context';
import { useSwitchChain } from 'wagmi';
import { SwitchChainErrorType } from 'wagmi/actions';
import { evmCommonErrorHandler } from '../utils/evmCommonErrorHandler';

export type UseEvmSwitchChainProps = Parameters<typeof useSwitchChain>[0];

export function useEvmSwitchChain(props?: UseEvmSwitchChainProps) {
  const { options, log, selectedWallet } = useWalletKit();

  const result = useSwitchChain({
    ...props,
    mutation: {
      ...props?.mutation,
      onError(error: SwitchChainErrorType, ...params) {
        evmCommonErrorHandler({
          log,
          handler: options.onError,
          error,
          wallet: selectedWallet,
        });
        props?.mutation?.onError?.(error, ...params);
      },
    },
  });

  return result;
}
