import '@node-real/walletkit/styles.css';
import '@/styles/globals.css';
import { bsc, mainnet } from 'wagmi/chains';

import {
  trustWallet,
  metaMask,
  walletConnect,
  defaultEvmConfig,
  binanceWallet,
} from '@node-real/walletkit/evm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  WalletKitProvider,
  ConnectModal,
  WalletKitConfig,
  SwitchNetworkModal,
  ProfileModal,
  ConnectButton,
} from '@node-real/walletkit';
import { AppProps } from 'next/app';

const queryClient = new QueryClient();

const config: WalletKitConfig = {
  options: {
    closeModalOnEsc: false,
  },
  evmConfig: defaultEvmConfig({
    autoConnect: true,
    initialChainId: 1,

    // WalletConnect 2.0 requires a projectId which you can create quickly
    // and easily for free over at WalletConnect Cloud https://cloud.walletconnect.com/sign-in
    walletConnectProjectId: '518ee55b46bc23b5b496b03b1322aa13',

    wallets: [binanceWallet(), metaMask(), trustWallet(), walletConnect()],
    chains: [mainnet, bsc],
  }),
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <WalletKitProvider config={config} debugMode={true} mode="auto">
        <Component {...pageProps} />
        <ConnectButton />
        <ConnectModal />
        <SwitchNetworkModal />
        <ProfileModal />
      </WalletKitProvider>
    </QueryClientProvider>
  );
}
