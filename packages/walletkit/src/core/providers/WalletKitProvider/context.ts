import { ThemeProviderProps } from '../ThemeProvider';
import React, { useContext } from 'react';
import { EvmConfig } from '@/evm/utils/getEvmConfig';
import { SolanaConfig } from '@/solana/utils/getSolanaConfig';
import { BaseWallet } from '@/core/configs/wallets/types';

export type Action = 'add-network' | undefined;

export interface WalletKitConfig {
  appearance: {
    mode?: ThemeProviderProps['mode'];
    theme?: ThemeProviderProps['theme'];

    title?: React.ReactNode;

    disclaimer?: React.ReactNode;
    gridLayoutThreshold?: number;
    useGridLayoutOnMobile?: boolean;

    hideNoWalletCTA?: boolean;
    hideOfficialWalletConnectCTA?: boolean;

    closeModalAfterSwitchingNetwork?: boolean;
    closeModalAfterConnected?: boolean;
    closeModalOnEsc?: boolean;
    closeModalOnOverlayClick?: boolean;

    openModalOnWrongNetwork?: boolean;

    walletDownloadUrl?: string;
  };
  eventHandlers?: {
    onClickWallet?: (wallet: BaseWallet, e?: React.MouseEvent) => undefined | boolean;
    onChainAlreadyAdded?: (wallet: BaseWallet, chainId: number) => void;
    onError?: (err: any, description: string) => void;
  };
  wallet: {
    autoConnect?: boolean;
    metadata?: { name: string; icon?: string; description?: string; url?: string };
    walletConnectProjectId?: string;
    evm: {
      initialChainId?: number;
    } & EvmConfig;
    solana?: SolanaConfig;
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

export function useLogger() {
  return useContext(WalletKitContext).log;
}

export function useAction() {
  const { action, setAction } = useContext(WalletKitContext);
  return {
    action,
    setAction,
  };
}

export function useSelectedWallet() {
  const { selectedWallet, setSelectedWallet } = useContext(WalletKitContext);
  return {
    selectedWallet,
    setSelectedWallet,
  };
}

export function useConfig() {
  return useContext(WalletKitContext).config;
}

export function useWalletConfig() {
  return useContext(WalletKitContext).config.wallet;
}

export function useAppearanceConfig() {
  return useContext(WalletKitContext).config.appearance;
}
