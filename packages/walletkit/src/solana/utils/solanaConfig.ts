import { WALLET_CONNECT_PROJECT_ID } from '@/core/configs/getDefaultConfig';
import { WalletType } from '@/core/configs/types';
import { Metadata } from '@/core/providers/WalletKitProvider/context';
import { SolanaWallet } from '@/solana/wallets';
import { setSolanaGlobalData } from '../globalData';

interface CustomizedSolanaConfig {
  autoConnect?: boolean;
  metadata?: Metadata;
  walletConnectProjectId?: string;
  rpcUrl: string;
  wallets: SolanaWallet[];
}

export interface SolanaConfig extends ReturnType<typeof solanaConfig> {
  walletType: WalletType;
}

export const solanaConfig = (params: CustomizedSolanaConfig) => {
  const {
    autoConnect = false,
    metadata = { name: 'WalletKit' },
    walletConnectProjectId = WALLET_CONNECT_PROJECT_ID,
    rpcUrl,
    wallets,
  } = params;

  setSolanaGlobalData({
    metadata,
    walletConnectProjectId,
    walletConnectModalIsOpen: false,
    rpcUrl,
  });

  const adapters = wallets.map((w) => w.getAdapter()) as any;

  return {
    walletType: 'solana' as WalletType,
    autoConnect,
    metadata,
    walletConnectProjectId,
    adapters,
    rpcUrl,
    wallets,
  };
};
