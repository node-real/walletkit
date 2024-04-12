import { useState } from 'react';
import { chains } from './chains';
import { WagmiConfig, createConfig } from 'wagmi';
import VConsole from 'vconsole';
import {
  ThemeMode,
  WalletKitButton,
  WalletKitOptions,
  WalletKitProvider,
  getDefaultConfig,
  useModal,
  useProfileModal,
  useSwitchNetworkModal,
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
import { SwitchNetworkModal } from '@/components/SwitchNetworkModal';
import { WalletKitEmbeddedModal } from '@/components/WalletKitEmbeddedModal';

new VConsole();

const config = createConfig(
  getDefaultConfig({
    autoConnect: false,
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
  hideInnerModal: true,
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
        <SwitchNetworkModal />
        <WalletKitEmbeddedModal />
      </WalletKitProvider>
    </WagmiConfig>
  );
}

function Example() {
  const modal = useModal();
  const profileModal = useProfileModal();
  const switchNetworkModal = useSwitchNetworkModal();

  return (
    <>
      <button onClick={() => modal.onOpen()}>Open Connect Modal</button>
      <button onClick={() => profileModal.onOpen()}>Open Profile Modal</button>
      <button onClick={() => switchNetworkModal.onOpen()}>Open SwitchNetwork Modal</button>
    </>
  );
}
