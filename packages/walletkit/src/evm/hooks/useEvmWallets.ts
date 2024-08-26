import { WalletKitContext } from '@/core/providers/WalletKitProvider/context';
import { useContext } from 'react';

export function useEvmWallets() {
  const { wallets } = useContext(WalletKitContext);

  return {
    wallets: wallets.filter((item) => item.walletType === 'evm'),
  };
}
