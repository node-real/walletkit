import { Metadata } from '@/core/providers/WalletKitProvider/context';

interface SolanaGlobalData {
  metadata?: Metadata;
  walletConnectProjectId?: string;
  walletConnectModalIsOpen?: boolean;
  rpcUrl?: string;
}

let solanaGlobalData: SolanaGlobalData = {};

export const setSolanaGlobalData = (value: Partial<SolanaGlobalData>) => {
  solanaGlobalData = {
    ...solanaGlobalData,
    ...value,
  };
};

export const getSolanaGlobalData = () => {
  return solanaGlobalData;
};
