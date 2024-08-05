import { WALLET_CONNECT_PROJECT_ID } from '@/ui/constants';
import { setGlobalData } from '../globalData';
import { getDefaultWallets } from './getDefaultWallets';
import { WalletProps } from '@/wallets';

export interface DefaultSolanaConfig {
  appName: string;
  appIcon?: string;
  appDescription?: string;
  appUrl?: string;

  // WC 2.0 requires a project ID (get one here: https://cloud.walletconnect.com/sign-in)
  walletConnectProjectId?: string;

  autoConnect?: boolean;
  rpcUrl: string;
  wallets?: WalletProps[];
}

export const defaultSolanaConfig = (params: DefaultSolanaConfig) => {
  const {
    appName = 'WalletKit',
    appIcon,
    appDescription,
    appUrl,
    walletConnectProjectId = WALLET_CONNECT_PROJECT_ID,
    wallets: customizedWallets,
    autoConnect = false,
    rpcUrl,
  } = params;

  const wallets = customizedWallets ?? getDefaultWallets();
  setGlobalData({
    appName,
    appIcon,
    appDescription,
    appUrl,
    walletConnectProjectId,
    wallets,
    rpcUrl,
  });

  const adapters = wallets.map((w) => w.getAdapter()) as any;

  return {
    adapters,
    rpcUrl,
    autoConnect,
  };
};
