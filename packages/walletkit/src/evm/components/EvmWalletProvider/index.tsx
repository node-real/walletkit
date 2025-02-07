import { WagmiProvider } from 'wagmi';
import { useWalletKit } from '@/core/providers/WalletKitProvider/context';
import { EvmUriProvider } from '../EvmUriProvider';

export interface EvmWalletProviderProps {
  children: React.ReactNode;
}

export function EvmWalletProvider(props: EvmWalletProviderProps) {
  const { children } = props;

  const { evmConfig } = useWalletKit();

  if (!evmConfig) {
    return <>{children}</>;
  }

  return (
    <WagmiProvider config={evmConfig.wagmiConfig} reconnectOnMount={evmConfig.autoConnect}>
      <EvmUriProvider />
      {children}
    </WagmiProvider>
  );
}
