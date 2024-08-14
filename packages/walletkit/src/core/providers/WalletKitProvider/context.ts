import { ThemeProviderProps } from '../ThemeProvider';
import React, { useContext } from 'react';
import { EvmConfig } from '@/evm/utils/getEvmConfig';
import { SolanaConfig } from '@/solana/utils/getSolanaConfig';
import { BaseWallet } from '@/core/configs/wallets/types';

export type Action = 'add-network' | undefined;

export interface WalletKitConfig {
  walletSetting?: {
    autoConnect?: boolean;
    metadata?: { name: string; icon?: string; description?: string; url?: string };
    walletConnectProjectId?: string;
    evm?: {
      initialChainId?: number;
    } & EvmConfig;
    solana?: SolanaConfig;
  };

  appearance?: {
    mode?: ThemeProviderProps['mode'];
    theme?: ThemeProviderProps['theme'];

    title?: React.ReactNode;

    disclaimer?: React.ReactNode;
    gridLayoutThreshold?: number;
    useGridLayoutOnMobile?: boolean;

    hideNoWalletCTA?: boolean;
    hideOfficialWalletConnectCTA?: boolean;

    walletDownloadUrl?: string;
  };

  events: {
    closeModalAfterSwitchingNetwork?: boolean;
    closeModalAfterConnected?: boolean;
    closeModalOnEsc?: boolean;
    closeModalOnOverlayClick?: boolean;
    openModalOnWrongNetwork?: boolean;

    onClickWallet?: (wallet: BaseWallet, e?: React.MouseEvent) => undefined | boolean;
    onChainAlreadyAdded?: (wallet: BaseWallet, chainId: number) => void;
    onError?: (err: any, description: string) => void;
  };
}

export type WalletErrorProps = {
  description?: string;
  error?: any;
};

export interface WalletKitContextProps {
  log: (...param: any) => void;
  config: WalletKitConfig;

  action: Action;
  setAction: (action: Action) => void;

  selectedWallet: BaseWallet;
  setSelectedWallet: (wallet: BaseWallet) => void;
}

export const WalletKitContext = React.createContext({} as WalletKitContextProps);

export function useWalletKit() {
  return useContext(WalletKitContext);
}

export function useConfig() {
  return useContext(WalletKitContext).config as Required<WalletKitConfig>;
}

export function useWalletSetting() {
  return useConfig().walletSetting as Required<WalletKitConfig>['walletSetting'];
}
