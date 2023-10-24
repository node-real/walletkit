import { WagmiConfig, createConfig } from 'wagmi';
import VConsole from 'vconsole';
import { chains } from './chains';
import {
  WalletKitButton,
  WalletKitProvider,
  getDefaultConfig,
  WalletKitOptions,
  toast,
} from '@totejs/walletkit';
import { metaMask, trustWallet, walletConnect } from '@totejs/walletkit/wallets';

new VConsole();

const config = createConfig(
  getDefaultConfig({
    appName: 'Test Connect Wallet',
    chains,
    walletConnectProjectId: 'e68a1816d39726c2afabf05661a32767',
    autoConnect: true,
    connectors: [trustWallet(), metaMask(), walletConnect()],
  }),
);

const options: WalletKitOptions = {
  initialChainId: 5600,
  // onError(_, description) {
  //   console.log(description);
  // },
};

export default function App() {
  return (
    <WagmiConfig config={config}>
      <WalletKitProvider options={options}>
        <Example />
      </WalletKitProvider>
    </WagmiConfig>
  );
}

function Example() {
  return (
    <>
      <WalletKitButton />
      <button onClick={() => toast.error({ description: 'test' })}>test</button>
    </>
  );
}
