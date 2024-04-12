import { WagmiConfig, createConfig } from 'wagmi';

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

const config = createConfig(
  getDefaultConfig({
    appName: 'WalletKit',
    chains,
    autoConnect: false,
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
    <WagmiConfig config={config}>
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
