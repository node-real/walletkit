import '@node-real/walletkit/styles.css';
import {
  ConnectModal,
  useConnectModal,
  WalletKitConfig,
  WalletKitProvider,
} from '@node-real/walletkit';
import { defaultEvmConfig, trustWallet, metaMask, walletConnect } from '@node-real/walletkit/evm';
import { mainnet } from 'viem/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAccount, useDisconnect } from 'wagmi';

const queryClient = new QueryClient();

const config: WalletKitConfig = {
  options: {
    closeModalOnEsc: false,
  },
  evmConfig: defaultEvmConfig({
    autoConnect: true,
    initialChainId: 1,
    walletConnectProjectId: '518ee55b46bc23b5b496b03b1322aa13',
    wallets: [metaMask(), trustWallet(), walletConnect()],
    chains: [mainnet],
  }),
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WalletKitProvider config={config} debugMode={true} mode="auto">
        <ConnectButton />
        <ConnectModal />
      </WalletKitProvider>
    </QueryClientProvider>
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

  return <button onClick={() => onOpen()}>connect</button>;
}
