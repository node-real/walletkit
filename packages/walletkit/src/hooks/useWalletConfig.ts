import { useWalletKit } from '@/components/WalletKitProvider/context';
import { WalletProps } from '@/wallets';
import { useMemo } from 'react';
import { Connector } from 'wagmi';

export function useWalletConfig(connector: Connector) {
  const { wallets } = useWalletKit();

  const wallet = useMemo(() => {
    return wallets.find((item) => item.id === connector.id) ?? {};
  }, [connector.id, wallets]);

  return wallet as WalletProps;
}
