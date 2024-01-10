# WalletKit

WalletKit is a React component library for easily connecting a wallet to your dApp.

## Features

- 💡 Typescript — Get types straight out of the box.
- 🌱 Ecosystem Standards — Built on top of [wagmi](https://wagmi.sh) and [viem](https://viem.sh)
- 🎨 Customization — Easily customizing wallets and themes

## Documentation

For full documentation, visit [here](https://node-real.github.io/walletkit).

## Examples

The following examples are provided in the [examples](./examples/) folder of this repo.

- [nextjs](./examples/nextjs/)
- [vite](./examples/vite/)

## Installation

```bash
npm i @node-real/walletkit wagmi viem

```

## Usage

```tsx
import '@node-real/walletkit/styles.css';
import { WagmiConfig, createConfig } from 'wagmi';
import { chains } from './chains';
import {
  WalletKitButton,
  WalletKitProvider,
  getDefaultConfig,
  WalletKitOptions,
  SwitchNetworkModal,
} from '@node-real/walletkit';
import { metaMask, trustWallet, walletConnect } from '@node-real/walletkit/wallets';

const config = createConfig(
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
    <WagmiConfig config={config}>
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

## Contributing

Please follow our [WalletKit Contribution Guide](./CONTRIBUTING.md).

## License

See [LICENSE](./LICENSE) for more information.
