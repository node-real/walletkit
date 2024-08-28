import {
  ConnectModal,
  useConnectModal,
  WalletKitConfig,
  WalletKitProvider,
} from '@node-real/walletkit';
import VConsole from 'vconsole';
import { evmConfig, metaMask, trustWallet, walletConnect } from '@node-real/walletkit/evm';
import { mainnet } from 'viem/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAccount, useDisconnect } from 'wagmi';

new VConsole();

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
