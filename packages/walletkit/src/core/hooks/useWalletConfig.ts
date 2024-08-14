import { useWalletKit } from '@/core/components/WalletKitProvider/context';
import { useMemo } from 'react';
import { WalletConfig } from '../types';

export function useWalletConfig(id: string) {
  const { wallets } = useWalletKit();

  const wallet = useMemo(() => {
    return wallets.find((item) => item.id === id) ?? {};
  }, [id, wallets]);

  return wallet as WalletConfig;
}
