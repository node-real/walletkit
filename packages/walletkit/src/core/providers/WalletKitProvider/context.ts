import React, { useContext } from 'react';
import { EvmConfig } from '@/evm/utils/defaultEvmConfig';
import { SolanaConfig } from '@/solana/utils/defaultSolanaConfig';
import { BaseWallet } from '@/core/configs/types';

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
}

export interface WalletKitContextProps {
  log: (...param: any) => void;

  options: NonNullable<WalletKitConfig['options']>;
  evmConfig?: EvmConfig;
  solanaConfig?: SolanaConfig;

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

// export function useEvmConfig() {
//   return useContext(WalletKitContext).evmConfig as EvmConfig;
// }

// export function useSolanaConfig() {
//   return useContext(WalletKitContext).solanaConfig as SolanaConfig;
// }

// // TODO
// export function useWalletKit1() {
//   const log = useLogger();
//   const { wallets, setWallets } = useContext(WalletKitContext);

//   const { connect } = useEvmConnect();
//   const connectors = useConnectors();

//   return {
//     wallets,
//     setWallets,

//     connect(options: { walletId: string; initialChainId?: number }) {
//       const { walletId, initialChainId } = options;
//       const wallet = wallets.find((item) => item.id === walletId);

//       if (!wallet) {
//         log(`wallet not found, walletId: ${walletId}`);
//       } else {
//         const connector = connectors.find((item) => item.id === walletId);
//         if (connector && wallet.isInstalled())
//           connect({
//             connector,
//             chainId: initialChainId,
//           });
//       }
//     },
//   };
// }
