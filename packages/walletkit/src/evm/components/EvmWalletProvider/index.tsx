import { useMemo } from 'react';
import { WagmiProvider } from 'wagmi';
import { getEvmConfig } from '../../utils/getEvmConfig';
import { useWalletConfig } from '@/core/providers/WalletKitProvider/context';

export interface EvmWalletProviderProps {
  children: React.ReactNode;
}

export function EvmWalletProvider(props: EvmWalletProviderProps) {
  const { children } = props;

  const { autoConnect, evmConfig } = useWalletConfig();

  const config = useMemo(() => {
    if (!evmConfig) return;
    return getEvmConfig(evmConfig);
  }, [evmConfig]);

  if (!config) {
    return <>{children}</>;
  }

  return (
    <WagmiProvider config={config} reconnectOnMount={autoConnect}>
      {children}
    </WagmiProvider>
  );
}
