import { useWalletConfig } from '@/core/providers/WalletKitProvider/context';
import { useMemo } from 'react';
import { WagmiProvider } from 'wagmi';
import { getEvmConfig } from '../../utils/getEvmConfig';

export interface EvmWalletProviderProps {
  children: React.ReactNode;
}

export function EvmWalletProvider(props: EvmWalletProviderProps) {
  const { children } = props;

  const { autoConnect, evm } = useWalletConfig();

  const config = useMemo(() => {
    return getEvmConfig(evm);
  }, [evm]);

  return (
    <WagmiProvider config={config} reconnectOnMount={autoConnect}>
      {children}
    </WagmiProvider>
  );
}
