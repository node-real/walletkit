import { Metadata } from '@/core/providers/WalletKitProvider/context';

interface TronGlobalData {
  metadata?: Metadata;
  walletConnectProjectId?: string;
  walletConnectModalIsOpen?: boolean;
}

let tronGlobalData: TronGlobalData = {};

export const setTronGlobalData = (value: Partial<TronGlobalData>) => {
  tronGlobalData = {
    ...tronGlobalData,
    ...value,
  };
};

export const getTronGlobalData = () => {
  return tronGlobalData;
};
