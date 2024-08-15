import {
  BaseWallet,
  ConnectModal,
  useConnectModal,
  useWallets,
  WalletKitConfig,
  WalletKitProvider,
} from '@node-real/walletkit';
import VConsole from 'vconsole';
import { metaMask, trustWallet, walletConnect } from '@node-real/walletkit/evm';
import {
  trustWallet as solanaTrustWallet,
  phantomWallet as solanaPhantomWallet,
} from '@node-real/walletkit/solana';
import { mainnet } from 'viem/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

new VConsole();

const queryClient = new QueryClient();

const config: WalletKitConfig = {
  walletSetting: {
    autoConnect: true,
    evm: {
      initialChainId: 1,
      wallets: [metaMask(), trustWallet(), walletConnect()],
      chains: [mainnet] as any[],
    },
    solana: {
      rpcUrl: 'https://solana-rpc.debridge.finance',
      wallets: [solanaTrustWallet(), solanaPhantomWallet()],
    },
  },
  appearance: {},
  events: {
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

function selectWallets(wallets: BaseWallet[], include: string, exclude: string) {
  const newWallets: BaseWallet[] = [];
  wallets.forEach((item) => {
    if (item.walletType === include) {
      newWallets.push({ ...item });
    } else if (item.walletType === exclude) {
      newWallets.push({
        ...item,
        render: ({ wallet, onClick }) => {
          return <button onClick={onClick}>{wallet.name}</button>;
        },
      });
    }
  });

  newWallets.forEach((item) => {
    if (
      newWallets.find(
        (e) => e.walletType === include && item.walletType === exclude && e.id === item.id,
      )
    ) {
      item.isVisible = false;
    }
  });

  newWallets.sort((a, b) => {
    if (a.walletType === b.walletType) return 0;
    if (a.walletType === include) return -1;
    return 0;
  });

  return newWallets;
}

function ConnectButton() {
  const { onOpen } = useConnectModal();
  const { wallets, setWallets } = useWallets();

  const onEvm = () => {
    const newWallets = selectWallets(wallets, 'evm', 'solana');
    setWallets(newWallets);
  };

  const onSolana = () => {
    const newWallets = selectWallets(wallets, 'solana', 'evm');
    setWallets(newWallets);
  };

  return (
    <>
      <button onClick={() => onOpen()}>connect</button>
      <button onClick={() => onEvm()}>evm</button>
      <button onClick={() => onSolana()}>solana</button>
    </>
  );
}
