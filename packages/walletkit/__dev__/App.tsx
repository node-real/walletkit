import './style.css';
import {
  ConnectModal,
  EmbeddedConnectModal,
  useConnectModal,
  WalletKitConfig,
  WalletKitProvider,
} from '@/core/index';
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
  useSolanaWallet,
} from '@/solana/index';
import { bsc, mainnet } from 'viem/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAccount, useDisconnect } from 'wagmi';
import { defaultTronConfig, tronLink, useTronWallet } from '@/tron/index';
import { Modal } from '@/core/base/components/Modal';
import { ModalBody } from '@/core/base/components/Modal/ModalBody';
import { useDisclosure } from '@/core/base/hooks/useDisclosure';
import { SwitchNetworkModal } from '@/core/modals/SwitchNetworkModal';

new VConsole();

const queryClient = new QueryClient();

const config: WalletKitConfig = {
  options: {
    openModalOnWrongNetwork: true,
    closeModalOnEsc: false,
    // gridLayoutThreshold: 1000,
    onChainAlreadyAdded({ wallet, chainId }) {
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
  solanaConfig: defaultSolanaConfig({
    autoConnect: true,
    rpcUrl: 'https://solana-rpc.debridge.finance',
    wallets: [solanaTrustWallet(), solanaPhantomWallet()],
  }),
  tronConfig: defaultTronConfig({
    autoConnect: true,
    initialChainId: '0xcd8690dc',
    wallets: [tronLink()],
  }),
};

export default function App() {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <QueryClientProvider client={queryClient}>
      <WalletKitProvider config={config} debugMode>
        <ConnectButton />
        <ConnectModal />
        <button onClick={onOpen}>connect modal</button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalBody>
            <EmbeddedConnectModal />
          </ModalBody>
        </Modal>
        <SwitchNetworkModal />
      </WalletKitProvider>
    </QueryClientProvider>
  );
}

function ConnectButton() {
  const { onOpen } = useConnectModal();

  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { publicKey, disconnect: solanaDisconnect } = useSolanaWallet();
  const { address: tronAddress, disconnect: tronDisconnect } = useTronWallet();

  return (
    <>
      <button
        onClick={() =>
          onOpen({
            action: 'add-network',
            evmConfig: {
              initialChainId: 56,
            },
            tronConfig: {
              initialChainId: '0xcd8690dc',
            },
          })
        }
      >
        connect
      </button>
      <div>
        evm address:{address} <button onClick={() => disconnect()}>disconnect</button>
      </div>
      <div>
        solana address:{publicKey?.toBase58()}
        <button onClick={() => solanaDisconnect()}>disconnect</button>
      </div>
      <div>
        tron address:{tronAddress}
        <button onClick={() => tronDisconnect()}>disconnect</button>
      </div>
    </>
  );
}
