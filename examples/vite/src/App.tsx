import '@node-real/walletkit/styles.css';
import {
  ConnectModal,
  WalletKitConfig,
  WalletKitProvider,
  ConnectButton,
  SwitchNetworkModal,
  ProfileModal,
} from '@node-real/walletkit';
import {
  defaultEvmConfig,
  trustWallet,
  metaMask,
  walletConnect,
  binanceWallet,
} from '@node-real/walletkit/evm';
import { bsc, mainnet } from 'viem/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WalletKitProvider config={config} debugMode={true} mode="auto">
        <ConnectButton />
        <ConnectModal />
        <SwitchNetworkModal />
        <ProfileModal />
      </WalletKitProvider>
    </QueryClientProvider>
  );
}
