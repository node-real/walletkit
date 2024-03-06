import { useState } from 'react';
import { chains } from './chains';
import { WagmiConfig, createClient } from 'wagmi';
import {
  SwitchNetworkModal,
  ThemeMode,
  WalletKitButton,
  WalletKitOptions,
  WalletKitProvider,
  getDefaultConfig,
  useModal,
} from '../src/index';

import {
  binanceWeb3Wallet,
  bitgetWallet,
  coinbaseWallet,
  mathWallet,
  metaMask,
  okxWallet,
  tokenPocket,
  trustWallet,
  walletConnect,
} from '@/wallets';

const client = createClient(
  getDefaultConfig({
    autoConnect: true,
    appName: 'WalletKit',
    chains,
    connectors: [
      binanceWeb3Wallet(),
      bitgetWallet(),
      coinbaseWallet(),
      metaMask(),
      okxWallet(),
      tokenPocket({
        isDisabled: true,
      }),
      trustWallet(),
      walletConnect(),
      mathWallet(),
    ],
  }),
);

const options: WalletKitOptions = {
  initialChainId: 204,
  gridLayoutThreshold: 4,
};

export default function App() {
  const [mode, setMode] = useState<ThemeMode>('light');
  const nextMode = mode === 'light' ? 'dark' : 'light';

  return (
    <WagmiConfig client={client}>
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
