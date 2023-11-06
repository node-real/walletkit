import '@totejs/walletkit/styles.css';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { chains } from './chains';
import { WagmiConfig, createConfig } from 'wagmi';
import {
  SwitchNetworkModal,
  WalletKitButton,
  WalletKitOptions,
  WalletKitProvider,
  getDefaultConfig,
} from '@totejs/walletkit';
import { trustWallet, metaMask, walletConnect } from '@totejs/walletkit/wallets';

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
  initialChainId: 56,
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={config}>
      <WalletKitProvider
        options={options}
        mode="auto"
        debugMode
        customTheme={{
          colors: {
            primary: 'red',
            primaryActive: 'red',
          },
        }}
      >
        <WalletKitButton />
        <Component {...pageProps} />
        <SwitchNetworkModal />
      </WalletKitProvider>
    </WagmiConfig>
  );
}
