import '@node-real/walletkit/styles.css';
import '@/styles/globals.css';
import { mainnet } from 'wagmi/chains';

import {
  trustWallet,
  metaMask,
  walletConnect,
  defaultEvmConfig,
  binanceWallet,
  codexFieldWallet,
  uxuyWallet,
} from '@node-real/walletkit/evm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  WalletKitProvider,
  ConnectModal,
  useConnectModal,
  WalletKitConfig,
} from '@node-real/walletkit';
import { AppProps } from 'next/app';
import { useAccount, useDisconnect, useSignMessage } from 'wagmi';
import { useState } from 'react';

const queryClient = new QueryClient();

const config: WalletKitConfig = {
  options: {
    closeModalOnEsc: false,
  },
  evmConfig: defaultEvmConfig({
    autoConnect: true,
    initialChainId: 1,
    walletConnectProjectId: '518ee55b46bc23b5b496b03b1322aa13',
    wallets: [
      binanceWallet(),
      metaMask(),
      trustWallet(),
      uxuyWallet(),
      codexFieldWallet(),
      walletConnect(),
    ],
    chains: [mainnet],
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
  const [signResult, setSignResult] = useState('');

  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();

  if (address) {
    return (
      <>
        <div>
          <button onClick={() => disconnect()}>disconnect</button>
          <div>address:{address}</div>
        </div>
        <div>
          <button
            onClick={async () => {
              const res = await signMessageAsync({ message: 'hello world' });
              setSignResult(res);
            }}
          >
            sign
          </button>

          <div>signed message:{signResult}</div>
        </div>
      </>
    );
  }

  return <button onClick={() => onOpen()}>connect</button>;
}
