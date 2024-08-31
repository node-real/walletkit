import { ConnectModal, useConnectModal, WalletKitConfig, WalletKitProvider } from '@/core/index';
import './style.css';
import VConsole from 'vconsole';
import {
  binanceWeb3Wallet,
  bitgetWallet,
  coinbaseWallet,
  defaultEvmConfig,
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
  defaultSolanaConfig,
} from '@/solana/index';
import { bsc, mainnet } from 'viem/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAccount, useDisconnect } from 'wagmi';

new VConsole();

const queryClient = new QueryClient();

const config: WalletKitConfig = {
  options: {
    closeModalOnEsc: false,
    onChainAlreadyAdded(wallet, chainId) {
      console.log(wallet, chainId);
    },
  },
  evmConfig: defaultEvmConfig({
    autoConnect: true,
    initialChainId: 1,
    walletConnectProjectId: 'e68a1816d39726c2afabf05661a32767',
    chains: [mainnet, bsc],
    wallets: [
      metaMask(),
      trustWallet(),
      bitgetWallet(),
      coinbaseWallet(),
      binanceWeb3Wallet(),

      tokenPocket(),
      okxWallet(),

      mathWallet(),
      walletConnect(),
    ],
  }),
  // solanaConfig: defaultSolanaConfig({
  //   autoConnect: true,
  //   rpcUrl: 'https://solana-rpc.debridge.finance',
  //   wallets: [solanaTrustWallet(), solanaPhantomWallet()],
  // }),
};

export default function App() {
  return (
    <WalletKitProvider config={config} debugMode>
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

  if (address) {
    return (
      <>
        <div>address:{address}</div>
        <button onClick={() => disconnect()}>disconnect</button>
      </>
    );
  }

  return (
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
  );
}
