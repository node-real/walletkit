import { useWalletKit } from '@/components/WalletKitProvider/context';
import { WalletProps } from '@/wallets';
import { useMemo } from 'react';

export function useWalletConfig(walletId?: string) {
  const { wallets } = useWalletKit();

  const wallet = useMemo(() => {
    return wallets.find((item) => item.id === walletId) ?? {};
  }, [walletId, wallets]);

  return wallet as WalletProps;
}
