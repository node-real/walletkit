# WalletKit

WalletKit is a React component library for easily connecting a wallet to your dApp.

## Features

- 💡 Typescript — Get types straight out of the box.
- 🌱 Ecosystem Standards — Built on top of [wagmi](https://wagmi.sh)
- 🎨 Customization — Easily customizing wallets and themes

## Documentation

For full documentation, visit [here](https://node-real.github.io/walletkit/website/dist/#/index).

## Examples

The following examples are provided in the [examples](./examples/) folder of this repo.

- [nextjs](https://github.com/node-real/walletkit/tree/main/examples/nextjs)
- [vite](https://github.com/node-real/walletkit/tree/main/examples/vite)

## Installation

```bash
npm i @totejs/walletkit^0 wagmi^0 ethers@^5

```

## Usage

```tsx
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
import { metaMask, trustWallet, walletConnect } from '@totejs/walletkit/wallets';

const client = createClient(
  getDefaultConfig({
    autoConnect: true,
    appName: 'WalletKit',

    // WalletConnect 2.0 requires a projectId which you can create quickly
    // and easily for free over at WalletConnect Cloud https://cloud.walletconnect.com/sign-in
    walletConnectProjectId: 'xxx',

    chains,
    connectors: [trustWallet(), metaMask(), walletConnect()],
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
```
