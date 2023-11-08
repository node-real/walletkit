import '@totejs/walletkit/styles.css';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { chains } from './chains';
import { WagmiConfig, createConfig } from 'wagmi';
import {
  SwitchNetworkModal,
  ThemeMode,
  WalletKitButton,
  WalletKitOptions,
  WalletKitProvider,
  getDefaultConfig,
  useModal,
} from '@totejs/walletkit';
import { trustWallet, metaMask, walletConnect } from '@totejs/walletkit/wallets';
import { useState } from 'react';

const config = createConfig(
  getDefaultConfig({
    autoConnect: true,
    appName: 'WalletKit',

    // WalletConnect 2.0 requires a projectId which you can create quickly
    // and easily for free over at WalletConnect Cloud https://cloud.walletconnect.com/sign-in
    walletConnectProjectId: 'e68a1816d39726c2afabf05661a32767',

    chains,
    connectors: [trustWallet(), metaMask(), walletConnect()],
  }),
);

const options: WalletKitOptions = {
  initialChainId: 56,
};

export default function App({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState<ThemeMode>('light');
  const nextMode = mode === 'light' ? 'dark' : 'light';

  return (
    <WagmiConfig config={config}>
      <div>mode: {mode} </div>
      <button onClick={() => setMode(nextMode)}>switch to {nextMode}</button>
      <div style={{ height: 20 }} />

      <WalletKitProvider options={options} mode={mode} debugMode>
        <WalletKitButton />
        <Example />
        <Component {...pageProps} />
        <SwitchNetworkModal />
      </WalletKitProvider>
    </WagmiConfig>
  );
}

function Example() {
  const { onOpen, onOpenProfile, onOpenSwitchNetwork } = useModal();

  return (
    <>
      <button onClick={onOpen}>Open Connect Modal</button>
      <button onClick={onOpenProfile}>Open Profile Modal</button>
      <button onClick={onOpenSwitchNetwork}>Open SwitchNetwork Modal</button>
    </>
  );
}
