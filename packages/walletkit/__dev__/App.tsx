import {
  EmbeddedConnectModal,
  useConnectModal,
  WalletKitConfig,
  WalletKitProvider,
} from '@/core/index';
import './style.css';
import VConsole from 'vconsole';
import {
  binanceWeb3Wallet,
  bitgetWallet,
  coinbaseWallet,
  mathWallet,
  metaMask,
  okxWallet,
  tokenPocket,
  trustWallet,
  walletConnect,
} from '@/evm/index';
import {
  trustWallet as solanaTrustWallet,
  phantomWallet as solanaPhantomWallet,
} from '@/solana/index';
import { mainnet } from 'viem/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

new VConsole();

const queryClient = new QueryClient();

const config: WalletKitConfig = {
  debug: true,
  appearance: {
    mode: 'light',
  },
  eventConfig: {
    closeModalOnEsc: false,
    closeModalOnOverlayClick: false,
    closeModalAfterConnected: true,
  },
  walletConfig: {
    autoConnect: true,
    evmConfig: {
      initialChainId: 1,
      chains: [mainnet],
      wallets: [
        metaMask(),
        trustWallet(),
        walletConnect(),
        binanceWeb3Wallet(),
        tokenPocket(),
        bitgetWallet(),
        okxWallet(),
        coinbaseWallet(),
        mathWallet(),
      ],
    },
    solanaConfig: {
      rpcUrl: 'https://solana-rpc.debridge.finance',
      wallets: [solanaTrustWallet(), solanaPhantomWallet()],
    },
  },
};

export default function App() {
  return (
    <WalletKitProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectButton />
        <EmbeddedConnectModal />
      </QueryClientProvider>
    </WalletKitProvider>
  );
}

function ConnectButton() {
  const { onOpen } = useConnectModal();

  return <button onClick={() => onOpen()}>connect</button>;
}
