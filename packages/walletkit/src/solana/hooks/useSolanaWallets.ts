import { WalletKitContext } from '@/core/providers/WalletKitProvider/context';
import { useContext } from 'react';

export function useSolanaWallets() {
  const { wallets } = useContext(WalletKitContext);

  return {
    wallets: wallets.filter((item) => item.walletType === 'solana'),
  };
}
