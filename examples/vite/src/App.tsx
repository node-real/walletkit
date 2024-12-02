import {
  ConnectModal,
  useConnectModal,
  WalletKitConfig,
  WalletKitProvider,
} from '@node-real/walletkit';
import {
  defaultEvmConfig,
  trustWallet,
  metaMask,
  walletConnect,
  binanceWeb3Wallet,
  uxuyWallet,
  codexFieldWallet,
} from '@node-real/walletkit/evm';
import { mainnet } from 'viem/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAccount, useDisconnect } from 'wagmi';
import VConsole from 'vconsole';

new VConsole();

const queryClient = new QueryClient();

const config: WalletKitConfig = {
  options: {
    closeModalOnEsc: false,
  },
  evmConfig: defaultEvmConfig({
    autoConnect: true,
    initialChainId: 1,
    walletConnectProjectId: 'e68a1816d39726c2afabf05661a32767',
    wallets: [
      binanceWeb3Wallet(),
      trustWallet(),
      walletConnect(),
      uxuyWallet(),
      codexFieldWallet(),
      metaMask(),
    ],
    chains: [mainnet] as any,
  }),
};

export default function App() {
  return (
    <WalletKitProvider config={config} debugMode={true} mode="auto">
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

  return <button onClick={() => onOpen()}>connect</button>;
}
