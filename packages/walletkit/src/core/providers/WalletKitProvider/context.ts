import { ThemeProviderProps } from '../ThemeProvider';
import React, { useContext } from 'react';
import { EvmConfig } from '@/evm/utils/getEvmConfig';
import { SolanaConfig } from '@/solana/utils/getSolanaConfig';
import { BaseWallet, WalletType } from '@/core/configs/types';

export type Action = 'add-network' | undefined;

export interface WalletKitConfig {
  debug?: boolean;

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

  eventConfig?: {
    closeModalAfterSwitchingNetwork?: boolean;
    closeModalAfterConnected?: boolean;
    closeModalOnEsc?: boolean;
    closeModalOnOverlayClick?: boolean;
    openModalOnWrongNetwork?: boolean;

    onClickWallet?: (wallet: BaseWallet, e?: React.MouseEvent) => undefined | boolean;
    onChainAlreadyAdded?: (wallet: BaseWallet, chainId: number) => void;
    onError?: (err: any, description: string) => void;
  };

  walletConfig: {
    autoConnect?: boolean;
    metadata?: { name: string; icon?: string; description?: string; url?: string };
    walletConnectProjectId?: string;
    evmConfig?: EvmConfig;
    solanaConfig?: SolanaConfig;
  };
}

export type WalletErrorProps = {
  description?: string;
  error?: any;
};

export interface WalletKitContextProps {
  logger: (...param: any) => void;
  config: WalletKitConfig;

  action: Action;
  setAction: (action: Action) => void;

  selectedWallet: BaseWallet;
  setSelectedWallet: (wallet: BaseWallet) => void;

  wallets: BaseWallet[];
  setWallets: React.Dispatch<React.SetStateAction<BaseWallet[]>>;

  initialChainId?: number;
  setInitialChainId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export const WalletKitContext = React.createContext({} as WalletKitContextProps);

export function useLogger() {
  return useContext(WalletKitContext).logger;
}

export function useAction() {
  const { action, setAction } = useContext(WalletKitContext);
  return {
    action,
    setAction,
  };
}

export function useInitialChainId() {
  const { initialChainId, setInitialChainId } = useContext(WalletKitContext);
  return {
    initialChainId,
    setInitialChainId,
  };
}

export function useSelectedWallet() {
  const { selectedWallet, setSelectedWallet } = useContext(WalletKitContext);
  return {
    selectedWallet,
    setSelectedWallet,
  };
}

export function useWallets(walletType?: WalletType) {
  const { wallets, setWallets } = useContext(WalletKitContext);

  if (walletType) {
    return {
      wallets: wallets.filter((item) => item.walletType === walletType),
      setWallets,
    };
  }

  return {
    wallets,
    setWallets,
  };
}

export function useConfig() {
  return useContext(WalletKitContext).config as Required<WalletKitConfig>;
}

export function useAppearance() {
  return useConfig().appearance as Required<WalletKitConfig>['appearance'];
}

export function useWalletConfig() {
  return useConfig().walletConfig as Required<WalletKitConfig>['walletConfig'];
}
