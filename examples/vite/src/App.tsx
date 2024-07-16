import '@node-real/walletkit/styles.css';
import './global.css';
import { bsc, mainnet, opBNB } from 'wagmi/chains';

import { trustWallet, metaMask, walletConnect } from '@node-real/walletkit/wallets';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ConnectModal,
  defaultWagmiConfig,
  ProfileModal,
  SwitchNetworkModal,
  WalletKitButton,
  WalletKitOptions,
  WalletKitProvider,
} from '@node-real/walletkit';
import { WagmiProvider } from 'wagmi';

const queryClient = new QueryClient();

const config = defaultWagmiConfig({
  appName: 'WalletKit',
  chains: [mainnet, bsc, opBNB],
  connectors: [trustWallet(), metaMask(), walletConnect()],

  // WalletConnect 2.0 requires a projectId which you can create quickly
  // and easily for free over at WalletConnect Cloud https://cloud.walletconnect.com/sign-in
  walletConnectProjectId: 'e68a1816d39726c2afabf05661a32767',
});

const options: WalletKitOptions = {
  initialChainId: 1,
};

export default function App() {
  return (
    <WagmiProvider config={config} reconnectOnMount={false}>
      <QueryClientProvider client={queryClient}>
        <WalletKitProvider options={options} mode="light">
          <WalletKitButton />
          <ConnectModal />
          <ProfileModal />
          <SwitchNetworkModal />
        </WalletKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
