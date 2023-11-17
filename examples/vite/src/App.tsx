import '@totejs/walletkit/styles.css';
import { WagmiConfig, createClient } from 'wagmi';
import { chains } from './chains';
import {
  WalletKitButton,
  WalletKitProvider,
  getDefaultConfig,
  WalletKitOptions,
  SwitchNetworkModal,
} from '@totejs/walletkit';
import { trustWallet, metaMask, walletConnect } from '@totejs/walletkit/wallets';

import VConsole from 'vconsole';

new VConsole();

const client = createClient(
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
      walletConnect({
        connectorOptions: {
          showQrModal: true,
          qrModalOptions: {
            explorerRecommendedWalletIds: [
              '8a0ee50d1f22f6651afcae7eb4253e52a3310b90af5daef78a8c4929a9bb99d4',
              'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
              '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0',
            ],
          },
        },
      }),
    ],
  }),
);

const options: WalletKitOptions = {
  initialChainId: 56,
};

export default function App() {
  return (
    <WagmiConfig client={client}>
      <WalletKitProvider options={options} mode="light">
        <WalletKitButton />
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
