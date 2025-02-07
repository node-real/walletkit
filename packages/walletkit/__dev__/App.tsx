import './style.css';
import { ConnectModal, useConnectModal, WalletKitConfig, WalletKitProvider } from '@/core/index';
import VConsole from 'vconsole';
import {
  binanceWallet,
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
import { bsc, mainnet, dfk } from 'viem/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAccount, useDisconnect } from 'wagmi';
import { defaultTronConfig, tronLink, useTronWallet } from '@/tron/index';
import { uxuyWallet } from '@/evm/wallets/uxuyWallet';
import { useEvmSwitchChain } from '@/evm/hooks/useEvmSwitchChain';
import { codexFieldWallet } from '@/evm/wallets/codexFieldWallet';
import { SwitchNetworkModal } from '@/core/modals/SwitchNetworkModal';
import { useConnectEvmWallet } from '@/evm/hooks/useConnectEvmWallet';

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
    walletConnectProjectId: '518ee55b46bc23b5b496b03b1322aa13',
    chains: [mainnet, bsc, dfk],
    wallets: [
      binanceWallet(),
      trustWallet(),
      walletConnect(),
      uxuyWallet(),
      codexFieldWallet(),
      metaMask(),

      bitgetWallet(),
      coinbaseWallet(),

      tokenPocket(),
      okxWallet(),

      mathWallet(),
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
  return (
    <QueryClientProvider client={queryClient}>
      <WalletKitProvider config={config} debugMode>
        <ConnectButton />
        <ConnectModal />
        <SwitchNetworkModal />
      </WalletKitProvider>
    </QueryClientProvider>
  );
}

function ConnectButton() {
  const { onOpen } = useConnectModal();

  const { address, chainId } = useAccount();
  const { disconnect } = useDisconnect();
  const { publicKey, disconnect: solanaDisconnect } = useSolanaWallet();
  const { address: tronAddress, disconnect: tronDisconnect } = useTronWallet();
  const { switchChain } = useEvmSwitchChain();

  const { connectWalletAsync } = useConnectEvmWallet();

  return (
    <>
      <div>
        <button
          onClick={async () => {
            await connectWalletAsync({
              walletId: 'binanceWeb3Wallet',
              chainId: 56,
            });
          }}
        >
          connect binance wallet
        </button>
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
        <button
          onClick={() => {
            switchChain({
              chainId: 1,
            });
          }}
        >
          switch 1
        </button>
        <button
          onClick={() => {
            switchChain({
              chainId: 56,
            });
          }}
        >
          switch 56
        </button>
      </div>
      <div>chain id: {chainId}</div>
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
