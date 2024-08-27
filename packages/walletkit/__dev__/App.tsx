import {
  ConnectModal,
  useConnectModal,
  useWalletKit,
  WalletKitConfig,
  WalletKitProvider,
} from '@/core/index';
import './style.css';
import VConsole from 'vconsole';
import {
  binanceWeb3Wallet,
  bitgetWallet,
  coinbaseWallet,
  evmConfig,
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
  solanaConfig,
} from '@/solana/index';
import { bsc, mainnet } from 'viem/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAccount, useDisconnect } from 'wagmi';

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
    onChainAlreadyAdded(wallet, chainId) {
      console.log(wallet, chainId);
    },
  },
  walletConfigs: [
    evmConfig({
      autoConnect: true,
      initialChainId: 1,
      walletConnectProjectId: 'e68a1816d39726c2afabf05661a32767',
      chains: [mainnet, bsc],
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
    }),
    solanaConfig({
      autoConnect: true,
      rpcUrl: 'https://solana-rpc.debridge.finance',
      wallets: [solanaTrustWallet(), solanaPhantomWallet()],
    }),
  ],
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

  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect } = useWalletKit();

  if (address) {
    return (
      <>
        <div>address:{address}</div>
        <button onClick={() => disconnect()}>disconnect</button>
      </>
    );
  }

  return (
    <>
      <button
        onClick={() =>
          onOpen({
            action: 'add-network',
            initialChainId: 1,
          })
        }
      >
        connect
      </button>
      <button
        onClick={() => {
          connect({
            walletId: 'metaMask',
            initialChainId: 1,
          });
        }}
      >
        connect metaMask
      </button>
    </>
  );
}
