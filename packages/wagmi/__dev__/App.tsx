import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import VConsole from 'vconsole';
import {
  defaultWagmiConfig,
  WalletKitOptions,
  WalletKitProvider,
  ConnectButton,
  ConnectModal,
  ProfileModal,
  SwitchNetworkModal,
  ThemeMode,
  useConnectModal,
  useProfileModal,
  useSwitchNetworkModal,
} from '@/index';
import {
  binanceWeb3Wallet,
  bitgetWallet,
  coinbaseWallet,
  metaMask,
  okxWallet,
  tokenPocket,
  trustWallet,
  walletConnect,
} from '@/wallets/index';
import { chains } from './chains';

const queryClient = new QueryClient();

new VConsole();

const config = defaultWagmiConfig({
  appName: 'WalletKit',
  chains,
  wallets: [
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

const options: WalletKitOptions = {
  initialChainId: 204,
};

export default function App() {
  const [mode, setMode] = useState<ThemeMode>('light');
  const nextMode = mode === 'light' ? 'dark' : 'light';

  return (
    <WagmiProvider config={config} reconnectOnMount={true}>
      <QueryClientProvider client={queryClient}>
        <WalletKitProvider options={options} mode={mode} debugMode={true}>
          <div>mode: {mode} </div>
          <button onClick={() => setMode(nextMode)}>switch to {nextMode}</button>
          <div style={{ height: 20 }} />

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
