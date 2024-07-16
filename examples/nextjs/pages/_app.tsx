import '@node-real/walletkit/styles.css';
import '@/styles/globals.css';
import { bsc, mainnet, opBNB } from 'wagmi/chains';

import { trustWallet, metaMask, walletConnect } from '@node-real/walletkit/wallets';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  defaultWagmiConfig,
  SwitchNetworkModal,
  WalletKitButton,
  WalletKitOptions,
  WalletKitProvider,
  ProfileModal,
  ConnectModal,
} from '@node-real/walletkit';
import { WagmiProvider } from 'wagmi';
import { AppProps } from 'next/app';

const queryClient = new QueryClient();

const config = defaultWagmiConfig({
  appName: 'WalletKit',
  chains: [bsc, mainnet, opBNB],
  connectors: [trustWallet(), metaMask(), walletConnect()],

  // WalletConnect 2.0 requires a projectId which you can create quickly
  // and easily for free over at WalletConnect Cloud https://cloud.walletconnect.com/sign-in
  walletConnectProjectId: 'e68a1816d39726c2afabf05661a32767',
});

const options: WalletKitOptions = {
  initialChainId: 1,
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config} reconnectOnMount={true}>
      <QueryClientProvider client={queryClient}>
        <WalletKitProvider options={options} mode="light">
          <Component {...pageProps} />
          <WalletKitButton />
          <ConnectModal />
          <ProfileModal />
          <SwitchNetworkModal />
        </WalletKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
