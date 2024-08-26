import { ThemeProviderProps } from '../ThemeProvider';
import React, { useContext } from 'react';
import { EvmConfig } from '@/evm/utils/evmConfig';
import { SolanaConfig } from '@/solana/utils/solanaConfig';
import { BaseWallet, WalletType } from '@/core/configs/types';

export type Action = 'add-network' | undefined;

export type Metadata = { name: string; icon?: string; description?: string; url?: string };

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

  walletConfigs: Array<EvmConfig | SolanaConfig>;
}

export type WalletErrorProps = {
  description?: string;
  error?: any;
};

export interface WalletKitContextProps {
  logger: (...param: any) => void;

  appearance: NonNullable<WalletKitConfig['appearance']>;
  eventConfig: NonNullable<WalletKitConfig['eventConfig']>;
  walletConfig: {
    evmConfig?: EvmConfig;
    solanaConfig?: SolanaConfig;
  };

  action: Action;
  setAction: (action: Action) => void;

  selectedWallet: BaseWallet;
  setSelectedWallet: (wallet: BaseWallet) => void;

  wallets: BaseWallet[];
  setWallets: React.Dispatch<React.SetStateAction<BaseWallet[]>>;
}

export const WalletKitContext = React.createContext({} as WalletKitContextProps);

export function useAppearance() {
  const { appearance } = useContext(WalletKitContext);
  return appearance;
}

export function useEventConfig() {
  const { eventConfig } = useContext(WalletKitContext);
  return eventConfig;
}

export function useEvmConfig() {
  const { walletConfig } = useContext(WalletKitContext);
  return walletConfig.evmConfig as EvmConfig;
}

export function useSolanaConfig() {
  const { walletConfig } = useContext(WalletKitContext);
  return walletConfig.solanaConfig as SolanaConfig;
}

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
