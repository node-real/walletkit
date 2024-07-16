import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, createConfig } from 'wagmi';
import VConsole from 'vconsole';
import {
  ConnectModal,
  EmbeddedConnectModal,
  ProfileModal,
  SwitchNetworkModal,
  ThemeMode,
  WalletKitButton,
  WalletKitOptions,
  WalletKitProvider,
  getDefaultConfig,
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
} from '@/wallets';
import { chains } from './chains';

const queryClient = new QueryClient();

new VConsole();

const config = createConfig(
  getDefaultConfig({
    appName: 'WalletKit',
    chains,
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
  }),
);

const options: WalletKitOptions = {
  initialChainId: 204,
};

export default function App() {
  const [mode, setMode] = useState<ThemeMode>('light');
  const nextMode = mode === 'light' ? 'dark' : 'light';

  return (
    <WagmiProvider config={config} reconnectOnMount={false}>
      <QueryClientProvider client={queryClient}>
        <WalletKitProvider options={options} mode={mode} debugMode={true}>
          <div>mode: {mode} </div>
          <button onClick={() => setMode(nextMode)}>switch to {nextMode}</button>
          <div style={{ height: 20 }} />
          <WalletKitButton />
          <Example />
          <ConnectModal />
          {/* <EmbeddedConnectModal /> */}
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
