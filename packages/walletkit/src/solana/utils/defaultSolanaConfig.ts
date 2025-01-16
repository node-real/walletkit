// import { Metadata } from '@/core/providers/WalletKitProvider/context';
import { Adapter, SolanaWallet, SolanaWalletBehavior } from '@/solana/wallets';
import { setSolanaGlobalData } from '../globalData';
import { getWalletBehaviorOnPlatform } from '@/core/utils/common';

interface CustomizedSolanaConfig {
  autoConnect?: boolean;
  // metadata?: Metadata;
  // walletConnectProjectId?: string;
  rpcUrl: string;
  wallets: SolanaWallet[];
}

export interface SolanaConfig extends CustomizedSolanaConfig {
  autoConnect: boolean;
  adapters: Adapter[];
}

export function defaultSolanaConfig(params: CustomizedSolanaConfig): SolanaConfig {
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
      const behavior = getWalletBehaviorOnPlatform<SolanaWalletBehavior>(w);
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
