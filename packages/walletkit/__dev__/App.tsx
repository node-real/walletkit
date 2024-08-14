import { ConnectModal, useConnectModal, WalletKitConfig, WalletKitProvider } from '@/core/index';
import './style.css';
import VConsole from 'vconsole';
import { metaMask, trustWallet } from '@/evm/wallets';
import {
  trustWallet as solanaTrustWallet,
  phantomWallet as solanaPhantomWallet,
} from '@/solana/wallets';
import { mainnet } from 'viem/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

new VConsole();

const queryClient = new QueryClient();

const config: WalletKitConfig = {
  walletSetting: {
    autoConnect: true,
    evm: {
      initialChainId: 1,
      wallets: [metaMask(), trustWallet()],
      chains: [mainnet],
    },
    solana: {
      rpcUrl: 'https://solana-rpc.debridge.finance',
      wallets: [solanaTrustWallet(), solanaPhantomWallet()],
    },
  },
  appearance: {},
  events: {},
};

export default function App() {
  return (
    <WalletKitProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectButton></ConnectButton>
        <ConnectModal />
      </QueryClientProvider>
    </WalletKitProvider>
  );
}

function ConnectButton() {
  const { onOpen } = useConnectModal();
  return <button onClick={() => onOpen()}>connect</button>;
}
