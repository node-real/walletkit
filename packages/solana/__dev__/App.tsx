import { useState } from 'react';
import VConsole from 'vconsole';
import {
  defaultSolanaConfig,
  WalletKitOptions,
  WalletKitProvider,
  ConnectButton,
  ConnectModal,
  ProfileModal,
  ThemeMode,
  useConnectModal,
  useProfileModal,
} from '@/index';
import { phantomWallet, trustWallet, walletConnect } from '@/wallets/index';

new VConsole();

const config = defaultSolanaConfig({
  autoConnect: true,
  appName: 'WalletKit',
  rpcUrl: 'https://api.devnet.solana.com',
  wallets: [trustWallet(), phantomWallet(), walletConnect()],
});

const options: WalletKitOptions = {};

export default function App() {
  const [mode, setMode] = useState<ThemeMode>('light');
  const nextMode = mode === 'light' ? 'dark' : 'light';

  return (
    <WalletKitProvider config={config} options={options} mode={mode} debugMode={true}>
      <div>mode: {mode} </div>
      <button onClick={() => setMode(nextMode)}>switch to {nextMode}</button>
      <div style={{ height: 20 }} />

      <ConnectButton />
      <Example />

      <ConnectModal />
      <ProfileModal />
    </WalletKitProvider>
  );
}

function Example() {
  const connectModal = useConnectModal();
  const profileModal = useProfileModal();

  return (
    <>
      <button onClick={() => connectModal.onOpen()}>Open Connect Modal</button>
      <button onClick={() => profileModal.onOpen()}>Open Profile Modal</button>
    </>
  );
}
