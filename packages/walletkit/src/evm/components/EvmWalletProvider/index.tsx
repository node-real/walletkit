import { useMemo } from 'react';
import { WagmiProvider } from 'wagmi';
import { getEvmConfig } from '../../utils/getEvmConfig';
import { useWalletSetting } from '@/core/providers/WalletKitProvider/context';

export interface EvmWalletProviderProps {
  children: React.ReactNode;
}

export function EvmWalletProvider(props: EvmWalletProviderProps) {
  const { children } = props;

  const { autoConnect, evm } = useWalletSetting();

  const config = useMemo(() => {
    if (!evm) return;
    return getEvmConfig(evm);
  }, [evm]);

  if (!config) {
    return <>{children}</>;
  }

  return (
    <WagmiProvider config={config} reconnectOnMount={autoConnect}>
      {children}
    </WagmiProvider>
  );
}
