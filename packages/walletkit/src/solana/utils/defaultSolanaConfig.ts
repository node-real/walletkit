// import { Metadata } from '@/core/providers/WalletKitProvider/context';
import { SolanaWallet } from '@/solana/wallets';
import { setSolanaGlobalData } from '../globalData';
import { getSolanaWalletPlatformBehavior } from './getSolanaWalletPlatformBehavior';

interface CustomizedSolanaConfig {
  autoConnect?: boolean;
  // metadata?: Metadata;
  // walletConnectProjectId?: string;
  rpcUrl: string;
  wallets: SolanaWallet[];
}

export type SolanaConfig = ReturnType<typeof defaultSolanaConfig>;

export function defaultSolanaConfig(params: CustomizedSolanaConfig) {
  const {
    autoConnect = false,
    // metadata = { name: 'WalletKit' },
    // walletConnectProjectId,
    rpcUrl,
    wallets,
  } = params;

  setSolanaGlobalData({
    // metadata,
    // walletConnectProjectId,
    // walletConnectModalIsOpen: false,
    rpcUrl,
  });

  const adapters = wallets
    .map((w) => {
      const behavior = getSolanaWalletPlatformBehavior(w);
      return behavior?.getAdapter?.();
    })
    .filter((e) => !!e);

  return {
    autoConnect,
    // metadata,
    // walletConnectProjectId,
    adapters,
    rpcUrl,
    wallets,
  };
}
