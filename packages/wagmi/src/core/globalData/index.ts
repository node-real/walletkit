import { WalletProps } from '@/wallets/index';

export interface GlobalDataType {
  appName: string;
  appIcon?: string;
  appDescription?: string;
  appUrl?: string;
  walletConnectProjectId?: string;
  walletConnectModalIsOpen?: boolean;
  wallets: WalletProps[];
}

let globalData: GlobalDataType = {
  appName: 'Connect Wallet',
  wallets: [],
};

export const setGlobalData = (value: Partial<GlobalDataType>) => {
  globalData = {
    ...globalData,
    ...value,
  };
};

export const getGlobalData = () => {
  return globalData;
};
