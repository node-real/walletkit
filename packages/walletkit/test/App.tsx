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
  coinbaseWallet,
  mathWallet,
  metaMask,
  okxWallet,
  tokenPocket,
  trustWallet,
  walletConnect,
  // particleWallet,
} from '@/wallets';
// import { ParticleNetwork } from '@particle-network/auth';

// const env = (import.meta as any).env;

// const particle = new ParticleNetwork({
//   projectId: env.VITE_PARTICLE_APP_PROJECT_ID,
//   clientKey: env.VITE_PARTICLE_APP_CLIENT_KEY,
//   appId: env.VITE_PARTICLE_APP_APP_ID,
//   wallet: { displayWalletEntry: true },
//   chainId: 204,
//   chainName: 'opBNB',
// });

// particle.setERC4337({
//   name: 'BICONOMY',
//   version: '2.0.0',
// });

const client = createClient(
  getDefaultConfig({
    autoConnect: true,
    appName: 'WalletKit',
    chains,
    connectors: [
      trustWallet(),
      metaMask(),
      okxWallet(),
      mathWallet(),
      binanceWeb3Wallet(),
      coinbaseWallet(),
      tokenPocket(),
      // particleWallet(),
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
