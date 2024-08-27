import '@node-real/walletkit/styles.css';
import '@/styles/globals.css';
import { mainnet } from 'wagmi/chains';

import { trustWallet, metaMask, walletConnect, evmConfig } from '@node-real/walletkit/evm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  WalletKitProvider,
  ConnectModal,
  useConnectModal,
  WalletKitConfig,
} from '@node-real/walletkit';
import { AppProps } from 'next/app';

const queryClient = new QueryClient();

const config: WalletKitConfig = {
  walletConfigs: [
    evmConfig({
      autoConnect: true,
      initialChainId: 1,
      walletConnectProjectId: 'e68a1816d39726c2afabf05661a32767',
      wallets: [metaMask(), trustWallet(), walletConnect()],
      chains: [mainnet] as any[],
    }),
  ],
  appearance: {
    mode: 'light',
  },
  eventConfig: {
    closeModalOnEsc: false,
    closeModalOnOverlayClick: false,
    closeModalAfterConnected: true,
  },
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WalletKitProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />

        {/* <ConnectButton /> */}
        <ConnectButton />
        <ConnectModal />

        {/* 
            Profile modal shows some basic information about the current account,
            If you don't need this modal, you can remove it.
          */}
        {/* <ProfileModal /> */}

        {/*
            👇 Here's the SwitchNetworkModal
            If the user switches to a network that is not supported by our dApp,
            this modal will be displayed to remind the user to switch to our supported networks.
          */}
        {/* <SwitchNetworkModal /> */}
      </QueryClientProvider>
    </WalletKitProvider>
  );
}

function ConnectButton() {
  const { onOpen } = useConnectModal();

  return <button onClick={() => onOpen()}>connect</button>;
}
