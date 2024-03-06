import { WagmiConfig, createClient } from 'wagmi';

import {
  WalletKitButton,
  WalletKitProvider,
  getDefaultConfig,
  WalletKitOptions,
  SwitchNetworkModal,
} from '@node-real/walletkit';
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
import { Box, useColorMode } from '@totejs/uikit';

const client = createClient(
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

const options: WalletKitOptions = {
  initialChainId: 1,
};

export default function Playground() {
  const { colorMode } = useColorMode();

  return (
    <Box borderRadius={8} border="1px solid readable.border" p={16}>
      <WagmiConfig client={client}>
        <WalletKitProvider options={options} mode={colorMode}>
          <WalletKitButton />
          <SwitchNetworkModal />
        </WalletKitProvider>
      </WagmiConfig>
    </Box>
  );
}
