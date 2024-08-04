import { useDataSource, WalletConfig } from '@/components/DataSourceProvider/context';
import { useMemo } from 'react';

export function useWalletConfig(id: string) {
  const { wallets } = useDataSource();

  const wallet = useMemo(() => {
    return wallets.find((item) => item.id === id) ?? {};
  }, [id, wallets]);

  return wallet as WalletConfig;
}
