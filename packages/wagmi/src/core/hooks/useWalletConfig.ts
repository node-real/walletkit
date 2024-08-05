import { WalletProps } from '@/wallets/types';
import { useMemo } from 'react';
import { useWalletKit } from '../components/WalletKitProvider/context';

export function useWalletConfig(walletId?: string) {
  const { wallets } = useWalletKit();

  const wallet = useMemo(() => {
    return wallets.find((item) => item.id === walletId) ?? {};
  }, [walletId, wallets]);

  return wallet as WalletProps;
}
