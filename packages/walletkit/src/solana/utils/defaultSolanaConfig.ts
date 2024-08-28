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

export type SolanaConfig = ReturnType<typeof defaultSolanaConfig>;

export function defaultSolanaConfig(params: CustomizedSolanaConfig) {
  const {
    autoConnect = false,
    metadata = { name: 'WalletKit' },
    walletConnectProjectId,
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
    autoConnect,
    metadata,
    walletConnectProjectId,
    adapters,
    rpcUrl,
    wallets,
  };
}
