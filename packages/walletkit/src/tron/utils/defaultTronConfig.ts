// import { Metadata } from '@/core/providers/WalletKitProvider/context';
import { TronWallet, TronWalletBehavior } from '@/tron/wallets';
import { setTronGlobalData } from '../globalData';
import { getWalletBehaviorOnPlatform } from '@/core/utils/common';

interface CustomizedTronConfig {
  autoConnect?: boolean;
  initialChainId?: string | number;
  // metadata?: Metadata;
  // walletConnectProjectId?: string;
  // rpcUrl: string;
  wallets: TronWallet[];
}

export type TronConfig = ReturnType<typeof defaultTronConfig>;

export function defaultTronConfig(params: CustomizedTronConfig) {
  const {
    autoConnect = false,
    initialChainId,
    // metadata = { name: 'WalletKit' },
    // walletConnectProjectId,
    // rpcUrl,
    wallets,
  } = params;

  setTronGlobalData({
    // metadata,
    // walletConnectProjectId,
    // walletConnectModalIsOpen: false,
    // rpcUrl,
  });

  const adapters = wallets
    .map((w) => {
      const behavior = getWalletBehaviorOnPlatform<TronWalletBehavior>(w);
      return behavior?.getAdapter?.();
    })
    .filter((e) => !!e);

  return {
    autoConnect,
    initialChainId,
    // metadata,
    // walletConnectProjectId,
    adapters,
    // rpcUrl,
    wallets,
  };
}
