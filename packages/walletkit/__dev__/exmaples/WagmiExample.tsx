import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import {
  defaultWagmiConfig,
  WalletKitProvider,
  ConnectButton,
  ConnectModal,
  ProfileModal,
  useConnectModal,
  useProfileModal,
  SwitchNetworkModal,
  useSwitchNetworkModal,
} from '@/wagmi';
import {
  binanceWeb3Wallet,
  bitgetWallet,
  coinbaseWallet,
  metaMask,
  walletConnect,
} from '@/wagmi/wallets';

import { chains } from '../chains';

const queryClient = new QueryClient();

const config = defaultWagmiConfig({
  appName: 'WalletKit',
  chains,
  wallets: [binanceWeb3Wallet(), bitgetWallet(), coinbaseWallet(), metaMask(), walletConnect()],
});

const options = {
  initialChainId: 204,
};

export function WagmiExample() {
  return (
    <WagmiProvider config={config} reconnectOnMount={true}>
      <QueryClientProvider client={queryClient}>
        <WalletKitProvider options={options} debugMode={true}>
          <ConnectButton />
          <Example />

          <ConnectModal />
          <SwitchNetworkModal />
          <ProfileModal />
        </WalletKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

function Example() {
  const connectModal = useConnectModal();
  const profileModal = useProfileModal();
  const switchNetworkModal = useSwitchNetworkModal();

  return (
    <>
      <button onClick={() => connectModal.onOpen()}>Open Connect Modal</button>
      <button onClick={() => profileModal.onOpen()}>Open Profile Modal</button>
      <button onClick={() => switchNetworkModal.onOpen()}>Open SwitchNetwork Modal</button>
    </>
  );
}
