import { chains } from './chains';
import { WagmiConfig, createConfig } from 'wagmi';
import VConsole from 'vconsole';
import {
  SwitchNetworkModal,
  ThemeMode,
  WalletKitButton,
  WalletKitOptions,
  WalletKitProvider,
  getDefaultConfig,
  useModal,
} from '../src/index';

import { useState } from 'react';
import {
  binanceWeb3Wallet,
  coinbaseWallet,
  mathWallet,
  metaMask,
  okxWallet,
  tokenPocket,
  trustWallet,
  walletConnect,
} from '../src/wallets';
import React from 'react';

new VConsole();

const config = createConfig(
  getDefaultConfig({
    autoConnect: true,
    appName: 'WalletKit',

    // WalletConnect 2.0 requires a projectId which you can create quickly
    // and easily for free over at WalletConnect Cloud https://cloud.walletconnect.com/sign-in
    walletConnectProjectId: 'e68a1816d39726c2afabf05661a32767',

    chains,
    connectors: [
      trustWallet(),
      metaMask(),
      okxWallet(),
      mathWallet(),
      binanceWeb3Wallet(),
      coinbaseWallet(),
      tokenPocket(),
      walletConnect(),
    ],
  }),
);

const options: WalletKitOptions = {
  // initialChainId: 204,
};

export default function App() {
  const [mode, setMode] = useState<ThemeMode>('light');
  const nextMode = mode === 'light' ? 'dark' : 'light';

  return (
    <WagmiConfig config={config}>
      <div>mode: {mode} </div>
      <button onClick={() => setMode(nextMode)}>switch to {nextMode}</button>
      <div style={{ height: 20 }} />

      <WalletKitProvider options={options} mode={mode} debugMode={true}>
        <WalletKitButton />
        <Example />
        <div style={{ height: 2000 }}></div>
        <SwitchNetworkModal />
      </WalletKitProvider>
    </WagmiConfig>
  );
}

function Example() {
  const { onOpen, onOpenProfile, onOpenSwitchNetwork } = useModal();

  return (
    <>
      <button onClick={() => onOpen()}>Open Connect Modal</button>
      <button onClick={() => onOpenProfile()}>Open Profile Modal</button>
      <button onClick={() => onOpenSwitchNetwork()}>Open SwitchNetwork Modal</button>
    </>
  );
}
