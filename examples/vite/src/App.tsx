import {
  WagmiConfig,
  createConfig,
  useAccount,
  useDisconnect,
  useNetwork,
  useSwitchNetwork,
} from 'wagmi';
import { chains } from './chains';
import {
  WalletKitButton,
  WalletKitProvider,
  getDefaultConfig,
  WalletKitOptions,
  SwitchNetworkModal,
  ThemeMode,
} from '@totejs/walletkit';
import { metaMask, trustWallet, walletConnect } from '@totejs/walletkit/wallets';
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
  initialChainId: 5600,
};

export default function App() {
  const [mode, setMode] = useState<ThemeMode>('light');
  const nextMode = mode === 'light' ? 'dark' : 'light';

  return (
    <WagmiConfig config={config}>
      <div>mode: {mode} </div>
      <button onClick={() => setMode(nextMode)}>switch to {nextMode}</button>
      <div style={{ height: 20 }} />

      <WalletKitProvider options={options} mode={mode}>
        <ConnectInfo />
        <ConnectButton />

        {/*
          👇 Here's the SwitchNetworkModal
          If the user switches to a network that is not supported by our dapp,
          this modal will be displayed to remind the user to switch to our supported networks.
        */}
        <SwitchNetworkModal />
      </WalletKitProvider>
    </WagmiConfig>
  );
}

function ConnectInfo() {
  const { address } = useAccount();
  const { chain } = useNetwork();

  return (
    <div>
      <div>address: {address || '-'}</div>
      <div>chainId: {chain?.id || '-'}</div>
    </div>
  );
}

function ConnectButton() {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { switchNetwork } = useSwitchNetwork();

  return (
    <>
      {isConnected ? (
        <>
          <button onClick={() => disconnect()}>disconnect</button>

          <button onClick={() => switchNetwork?.(56)}>chainId 56</button>
          <button onClick={() => switchNetwork?.(97)}>chainId 97</button>
          <button onClick={() => switchNetwork?.(204)}>chainId 204</button>
          <button onClick={() => switchNetwork?.(5600)}>chainId 5600</button>
        </>
      ) : (
        <WalletKitButton.Custom>
          {({ show }) => {
            return <button onClick={show}>connect</button>;
          }}
        </WalletKitButton.Custom>
      )}
    </>
  );
}
