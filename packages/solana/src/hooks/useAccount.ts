import { useWallet } from '@solana/wallet-adapter-react';

export function useAccount() {
  const { wallet } = useWallet();
  return {
    address: wallet?.adapter.publicKey?.toBase58(),
  };
}
