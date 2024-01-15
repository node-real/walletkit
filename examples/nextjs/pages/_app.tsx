import '@node-real/walletkit/styles.css';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { chains } from './chains';
import { WagmiConfig, createClient } from 'wagmi';
import {
  SwitchNetworkModal,
  WalletKitButton,
  WalletKitOptions,
  WalletKitProvider,
  getDefaultConfig,
} from '@node-real/walletkit';
import { trustWallet, metaMask, walletConnect } from '@node-real/walletkit/wallets';

const client = createClient(
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
  initialChainId: 1,
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <WalletKitProvider options={options} mode="light">
        <WalletKitButton />
        <Component {...pageProps} />
        <SwitchNetworkModal />
      </WalletKitProvider>
    </WagmiConfig>
  );
}
