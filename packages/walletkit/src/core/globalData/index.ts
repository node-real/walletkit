import { WalletKitConfig } from '../providers/WalletKitProvider/context';

export interface GlobalDataType {
  metadata?: WalletKitConfig['walletSetting']['metadata'];
  walletConnectProjectId?: string;
  walletConnectModalIsOpen?: boolean;
  solanaRpcUrl?: string;
}

let globalData: GlobalDataType = {};

export const setGlobalData = (value: Partial<GlobalDataType>) => {
  globalData = {
    ...globalData,
    ...value,
  };
};

export const getGlobalData = () => {
  return globalData;
};
