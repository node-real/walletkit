import { WagmiConfig, createClient } from 'wagmi';

import { WalletKitProvider, getDefaultConfig } from '@node-real/walletkit';
import {
  binanceWeb3Wallet,
  bitgetWallet,
  coinbaseWallet,
  // mathWallet,
  metaMask,
  okxWallet,
  tokenPocket,
  trustWallet,
  walletConnect,
} from '@node-real/walletkit/wallets';

import { chains } from './chains';
import { useColorMode } from '@node-real/uikit';

const client = createClient(
  getDefaultConfig({
    appName: 'WalletKit',
    chains,
    autoConnect: true,
    connectors: [
      binanceWeb3Wallet(),
      bitgetWallet(),
      coinbaseWallet(),
      metaMask(),
      okxWallet(),
      tokenPocket(),
      trustWallet(),
      walletConnect(),
      // mathWallet(),
    ],
  }),
);

export function Playground(props: React.PropsWithChildren) {
  const { colorMode } = useColorMode();

  return (
    <WagmiConfig client={client}>
      <WalletKitProvider
        mode={colorMode}
        options={{
          initialChainId: 1,
          hideInnerModal: true,
        }}
      >
        {props.children}
      </WalletKitProvider>
    </WagmiConfig>
  );
}
