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
npm i @node-real/walletkit@^2 wagmi@^2 viem@^2 @tanstack/react-query@^5
```

## Usage

```tsx
import '@node-real/walletkit/styles.css';

import { trustWallet, metaMask, walletConnect } from '@node-real/walletkit/wallets';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  defaultWagmiConfig,
  SwitchNetworkModal,
  WalletKitButton,
  WalletKitOptions,
  WalletKitProvider,
  ProfileModal,
  ConnectModal,
} from '@node-real/walletkit';
import { WagmiProvider } from 'wagmi';
import { AppProps } from 'next/app';
import { chains } from './chains';

const queryClient = new QueryClient();

const config = defaultWagmiConfig({
  appName: '[Your app name]', // Your app name
  chains,
  connectors: [trustWallet(), metaMask(), walletConnect()],

  // WalletConnect 2.0 requires a projectId which you can create quickly
  // and easily for free over at WalletConnect Cloud https://cloud.walletconnect.com/sign-in
  walletConnectProjectId: 'xxx',
});

const options: WalletKitOptions = {
  initialChainId: 1,
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config} reconnectOnMount={true}>
      <QueryClientProvider client={queryClient}>
        <WalletKitProvider options={options} mode="light">
          <Component {...pageProps} />

          <WalletKitButton />
          <ConnectModal />

          {/* 
            Profile modal shows some basic information about the current account,
            if you don't need this modal, you can remove it.
          */}
          <ProfileModal />

          {/* 👇 Here's the SwitchNetworkModal
            If the user switches to a network that is not supported by our dApp,
            this modal will be displayed to remind the user to switch to our supported networks.
          */}
          <SwitchNetworkModal />
        </WalletKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
```

## Contributing

Please follow our [WalletKit Contribution Guide](./CONTRIBUTING.md).

## License

See [LICENSE](./LICENSE) for more information.
