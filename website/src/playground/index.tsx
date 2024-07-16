import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { defaultWagmiConfig, WalletKitProvider } from '@node-real/walletkit';
import {
  binanceWeb3Wallet,
  bitgetWallet,
  coinbaseWallet,
  // mathWallet,
  metaMask,
  okxWallet,
  tokenPocket,
  trustWallet,
  walletConnect,
} from '@node-real/walletkit/wallets';

import { useColorMode } from '@node-real/uikit';
import { arbitrum, bsc, mainnet, opBNB, polygon } from 'viem/chains';

const queryClient = new QueryClient();

const config = defaultWagmiConfig({
  appName: 'WalletKit',
  chains: [mainnet, bsc, polygon, opBNB, arbitrum],
  connectors: [
    binanceWeb3Wallet(),
    bitgetWallet(),
    coinbaseWallet(),
    metaMask(),
    okxWallet(),
    tokenPocket(),
    trustWallet(),
    walletConnect(),
  ],
});

export function Playground(props: React.PropsWithChildren) {
  const { colorMode } = useColorMode();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <WalletKitProvider
          mode={colorMode}
          options={{
            initialChainId: 1,
          }}
        >
          {props.children}
        </WalletKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
