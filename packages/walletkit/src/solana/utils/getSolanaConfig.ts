import { SolanaWallet, trustWallet, phantomWallet } from '@/solana/wallets';

export interface SolanaConfig {
  rpcUrl: string;
  wallets?: SolanaWallet[];
}

export const getSolanaConfig = (params: SolanaConfig) => {
  const { wallets: customizedWallets, rpcUrl } = params;

  const wallets = customizedWallets ?? getDefaultSolanaWallets();
  const adapters = wallets.map((w) => w.getAdapter()) as any;

  return {
    adapters,
    rpcUrl,
  };
};

function getDefaultSolanaWallets() {
  const wallets: SolanaWallet[] = [trustWallet(), phantomWallet()];
  return wallets;
}
