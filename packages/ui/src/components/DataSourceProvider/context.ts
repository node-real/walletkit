import React, { ReactNode, useContext } from 'react';
import { ColorMode } from '../ThemeProvider/context';
import { CONNECT_STATUS } from '@/constants';

export type Action = 'add-network' | undefined;

export interface ChainConfig {
  id: number;
  name: string;
  logo: React.ReactNode;
}

export interface WalletConfig {
  id: string;
  name: string;
  logos: {
    default: React.ReactElement | { [x in ColorMode]: React.ReactElement };
    transparent?: React.ReactElement | { [x in ColorMode]: React.ReactElement };
  };
  downloadUrls: {
    default: string | undefined;
  };
  isDisabled?: boolean;
  render?: (props: WalletRenderProps) => React.ReactNode;
  spinnerColor?: string;
  showQRCode?: boolean;
  isInstalled: () => boolean | undefined;
}

export interface WalletRenderProps {
  layout: 'list' | 'grid';
  colorMode: ColorMode;
  wallet: {
    id: string;
    name: string;
    logo: React.ReactElement;
    isDisabled?: boolean;
  };
  onClick: (e: React.MouseEvent<Element, MouseEvent>) => void;
}

export interface ClickWalletParams {
  walletId: string;
  event: React.MouseEvent<Element, MouseEvent>;
  gotoQRCodeView: () => void;
  gotoConnectingView: () => void;
}

export interface ClickSwitchChainParams {
  chainId: number;
  onSuccess: () => void;
}

export interface DataSource {
  options: {
    title?: ReactNode;
    disclaimer?: ReactNode;
    hideNoWalletCTA?: boolean;
    hideOfficialWalletConnectCTA?: boolean;

    gridLayoutThreshold?: number;
    useGridLayoutOnMobile?: boolean;

    closeModalAfterConnected?: boolean;
    closeModalAfterSwitchingNetwork?: boolean;
    closeModalOnEsc?: boolean;
    closeModalOnOverlayClick?: boolean;

    openModalOnWrongNetwork?: boolean;

    walletDownloadUrl?: string;
    onError?: (error: any, description: string) => void;
  };
  log: (...params: any) => void;
  action: Action;
  setAction: (action: Action) => void;
  wallets: WalletConfig[];

  useProvider: () => {
    walletId: string;
    isConnected: boolean;
  };

  useAccount: () => {
    balance?: {
      formatted: string;
      symbol: string;
    };
    address?: `0x${string}` | string;
  };

  useChain: () => {
    chain?: any;
    isSupported?: boolean;
  };

  useConnectedButton: () => {
    chainName: string;
    chainLogo: React.ReactNode;
  };

  useDisconnectButton: () => {
    onClick: () => void;
  };

  useConnectWithQRCodeView: () => {
    qrCodeUri: string;
    onClickOpenWcModal: () => void;
  };

  useConnectingView: () => {
    isWalletConflict: boolean;
    status: CONNECT_STATUS;
    onClickTryAgain: () => void;
    runConnect: () => void;
  };

  useConnectorsView: () => {
    onClickWallet: (params: ClickWalletParams) => void;
  };

  useSwitchingConfig: () => {
    chainsConfig: ChainConfig[];
    isPending: boolean;
    onClickSwitchChain: (params: ClickSwitchChainParams) => void;
  };
}

export interface DataSourceContextProps extends DataSource {
  isMobileLayout: boolean;
}

export const DataSourceContext = React.createContext({} as DataSourceContextProps);

export function useDataSource() {
  return useContext(DataSourceContext);
}
