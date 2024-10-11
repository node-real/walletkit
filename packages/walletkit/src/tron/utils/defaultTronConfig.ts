// import { Metadata } from '@/core/providers/WalletKitProvider/context';
import { TronWallet } from '@/tron/wallets';
import { setTronGlobalData } from '../globalData';

interface CustomizedTronConfig {
  autoConnect?: boolean;
  // metadata?: Metadata;
  // walletConnectProjectId?: string;
  // rpcUrl: string;
  wallets: TronWallet[];
}

export type TronConfig = ReturnType<typeof defaultTronConfig>;

export function defaultTronConfig(params: CustomizedTronConfig) {
  const {
    autoConnect = false,
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

  const adapters = wallets.map((w) => w.getAdapter()) as any;

  return {
    autoConnect,
    // metadata,
    // walletConnectProjectId,
    adapters,
    // rpcUrl,
    wallets,
  };
}
