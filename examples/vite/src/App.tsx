import {
  ConnectModal,
  useConnectModal,
  WalletKitConfig,
  WalletKitProvider,
} from '@node-real/walletkit';
import VConsole from 'vconsole';
import { metaMask, trustWallet, walletConnect } from '@node-real/walletkit/evm';
import { mainnet } from 'viem/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

new VConsole();

const queryClient = new QueryClient();

const config: WalletKitConfig = {
  walletConfig: {
    autoConnect: true,
    evmConfig: {
      initialChainId: 1,
      wallets: [metaMask(), trustWallet(), walletConnect()],
      chains: [mainnet] as any[],
    },
  },
  appearance: {
    mode: 'auto',
  },
  eventConfig: {
    closeModalOnEsc: false,
    closeModalOnOverlayClick: false,
    closeModalAfterConnected: true,
  },
};

export default function App() {
  return (
    <WalletKitProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectButton />
        <ConnectModal />
      </QueryClientProvider>
    </WalletKitProvider>
  );
}

function ConnectButton() {
  const { onOpen } = useConnectModal();
  return <button onClick={() => onOpen()}>connect</button>;
}
