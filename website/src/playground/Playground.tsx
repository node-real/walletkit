import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WalletKitConfig, WalletKitProvider } from '@node-real/walletkit';
import {
  binanceWeb3Wallet,
  bitgetWallet,
  coinbaseWallet,
  defaultEvmConfig,
  metaMask,
  okxWallet,
  tokenPocket,
  trustWallet,
  walletConnect,
} from '@node-real/walletkit/evm';

import {
  trustWallet as solanaTrustWallet,
  phantomWallet as solanaPhantomWallet,
  defaultSolanaConfig,
} from '@node-real/walletkit/solana';

import { useColorMode } from '@node-real/uikit';
import { arbitrum, bsc, mainnet, opBNB, polygon } from 'viem/chains';
import { defaultTronConfig, tronLink } from '@node-real/walletkit/tron';

const queryClient = new QueryClient();

const config: WalletKitConfig = {
  options: {
    openModalOnWrongNetwork: true,
    closeModalOnEsc: false,
    onChainAlreadyAdded({ wallet, chainId }) {
      console.log(wallet, chainId);
    },
  },
  evmConfig: defaultEvmConfig({
    autoConnect: true,
    initialChainId: 1,
    walletConnectProjectId: 'e68a1816d39726c2afabf05661a32767',
    chains: [mainnet, bsc, polygon, arbitrum, opBNB] as any[],
    wallets: [
      metaMask(),
      trustWallet(),
      bitgetWallet(),
      coinbaseWallet(),
      binanceWeb3Wallet(),
      tokenPocket(),
      okxWallet(),
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

export function Playground(props: React.PropsWithChildren) {
  const { colorMode } = useColorMode();

  return (
    <QueryClientProvider client={queryClient}>
      <WalletKitProvider config={config} debugMode mode={colorMode}>
        {props.children}
      </WalletKitProvider>
    </QueryClientProvider>
  );
}
