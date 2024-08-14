import { SolanaWallet } from '@/solana/wallets';

export interface SolanaConfig {
  rpcUrl: string;
  wallets: SolanaWallet[];
}

export const getSolanaConfig = (params: SolanaConfig) => {
  const { wallets, rpcUrl } = params;

  const adapters = wallets.map((w) => w.getAdapter()) as any;

  return {
    adapters,
    rpcUrl,
  };
};
