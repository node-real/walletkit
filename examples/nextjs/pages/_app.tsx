import '@node-real/walletkit/styles.css';
import '@/styles/globals.css';
import { mainnet } from 'wagmi/chains';

import { trustWallet, metaMask, walletConnect, defaultEvmConfig } from '@node-real/walletkit/evm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  WalletKitProvider,
  ConnectModal,
  useConnectModal,
  WalletKitConfig,
} from '@node-real/walletkit';
import { AppProps } from 'next/app';
import { useAccount, useDisconnect } from 'wagmi';

const queryClient = new QueryClient();

const config: WalletKitConfig = {
  options: {
    closeModalOnEsc: false,
  },
  evmConfig: defaultEvmConfig({
    autoConnect: true,
    initialChainId: 1,
    walletConnectProjectId: 'e68a1816d39726c2afabf05661a32767',
    wallets: [metaMask(), trustWallet(), walletConnect()],
    chains: [mainnet] as any,
  }),
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <WalletKitProvider config={config} debugMode={true} mode="auto">
        <Component {...pageProps} />
        <ConnectButton />
        <ConnectModal />
      </WalletKitProvider>
    </QueryClientProvider>
  );
}

function ConnectButton() {
  const { onOpen } = useConnectModal();

  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <>
        <div>address:{address}</div>
        <button onClick={() => disconnect()}>disconnect</button>
      </>
    );
  }

  return <button onClick={() => onOpen()}>connect</button>;
}
