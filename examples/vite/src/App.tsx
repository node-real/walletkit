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
} from '@totejs/walletkit';
import { metaMask, trustWallet, walletConnect } from '@totejs/walletkit/wallets';
import { useState } from 'react';

const config = createConfig(
  getDefaultConfig({
    appName: 'WalletKit',
    chains,
    walletConnectProjectId: 'e68a1816d39726c2afabf05661a32767', //
    autoConnect: true,
    connectors: [trustWallet(), metaMask(), walletConnect()],
  }),
);

const options: WalletKitOptions = {
  initialChainId: 5600,
};

export default function App() {
  const [mode, setMode] = useState<any>('light');
  const nextMode = mode === 'light' ? 'dark' : 'light';

  return (
    <WagmiConfig config={config}>
      <div>mode: {mode} </div>
      <button onClick={() => setMode(nextMode)}>switch to {nextMode}</button>
      <div style={{ height: 20 }} />

      <WalletKitProvider options={options} mode={mode}>
        <Example />
      </WalletKitProvider>
    </WagmiConfig>
  );
}

function Example() {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { disconnect } = useDisconnect();
  const { switchNetwork } = useSwitchNetwork();

  return (
    <>
      <div>address: {address}</div>
      <div>chainId: {chain?.id}</div>
      {isConnected ? (
        <>
          <button onClick={() => disconnect()}>disconnect</button>
          <button onClick={() => switchNetwork?.(56)}>switch 56</button>
          <button onClick={() => switchNetwork?.(97)}>switch 97</button>
          <button onClick={() => switchNetwork?.(204)}>switch 204</button>
          <button onClick={() => switchNetwork?.(5600)}>switch 5600</button>
        </>
      ) : (
        <WalletKitButton.Custom>
          {({ show }) => {
            return <button onClick={show}>connect</button>;
          }}
        </WalletKitButton.Custom>
      )}

      <SwitchNetworkModal />
    </>
  );
}
