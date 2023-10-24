export interface GlobalDataType {
  walletConnectDefaultOptions: {
    walletConnectProjectId?: string;
    appName: string;
    appIcon?: string;
    appDescription?: string;
    appUrl?: string;
  };
}

let globalData: GlobalDataType = {
  walletConnectDefaultOptions: {
    appName: 'Connect Wallet',
  },
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
