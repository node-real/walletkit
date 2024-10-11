import React, { useContext } from 'react';
import { EvmConfig } from '@/evm/utils/defaultEvmConfig';
import { SolanaConfig } from '@/solana/utils/defaultSolanaConfig';
import { BaseWallet } from '@/core/configs/types';
import { TronConfig } from '@/tron/index';

export type Action = 'add-network' | undefined;

export type Metadata = { name: string; icon?: string; description?: string; url?: string };

export interface WalletKitConfig {
  options?: {
    title?: React.ReactNode;

    disclaimer?: React.ReactNode;
    gridLayoutThreshold?: number;
    useGridLayoutOnMobile?: boolean;

    hideNoWalletCTA?: boolean;
    hideOfficialWalletConnectCTA?: boolean;

    walletDownloadUrl?: string;

    closeModalAfterSwitchingNetwork?: boolean;
    closeModalAfterConnected?: boolean;
    closeModalOnEsc?: boolean;
    closeModalOnOverlayClick?: boolean;
    openModalOnWrongNetwork?: boolean;

    onClickWallet?: (wallet: BaseWallet, e?: React.MouseEvent) => undefined | boolean;
    onChainAlreadyAdded?: (wallet: BaseWallet, chainId: number) => void;
    onError?: (err: any, description: string) => void;
  };

  evmConfig?: EvmConfig;
  solanaConfig?: SolanaConfig;
  tronConfig?: TronConfig;
}

export interface WalletKitContextProps {
  log: (...param: any) => void;

  options: NonNullable<WalletKitConfig['options']>;
  evmConfig?: EvmConfig;
  solanaConfig?: SolanaConfig;
  tronConfig?: TronConfig;

  action: Action;
  setAction: (action: Action) => void;

  selectedWallet: BaseWallet;
  setSelectedWallet: (wallet: BaseWallet) => void;

  wallets: BaseWallet[];
  setWallets: React.Dispatch<React.SetStateAction<BaseWallet[]>>;
}

export const WalletKitContext = React.createContext({} as WalletKitContextProps);

export function useWalletKit() {
  return useContext(WalletKitContext);
}
