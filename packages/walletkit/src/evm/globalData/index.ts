import { Metadata } from '@/core/providers/WalletKitProvider/context';

interface EvmGlobalData {
  metadata?: Metadata;
  walletConnectProjectId?: string;
}

let evmGlobalData: EvmGlobalData = {};

export const setEvmGlobalData = (value: Partial<EvmGlobalData>) => {
  evmGlobalData = {
    ...evmGlobalData,
    ...value,
  };
};

export const getEvmGlobalData = () => {
  return evmGlobalData;
};
