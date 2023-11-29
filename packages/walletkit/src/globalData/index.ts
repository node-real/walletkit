import { Connector } from 'wagmi/connectors';

export interface GlobalDataType {
  appName: string;
  appIcon?: string;
  appDescription?: string;
  appUrl?: string;
  walletConnectProjectId?: string;
  walletConnectConnector?: Connector;
}

let globalData: GlobalDataType = {
  appName: 'Connect Wallet',
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
