import { WagmiConfig, createConfig } from 'wagmi';

import {
  WalletKitButton,
  WalletKitProvider,
  getDefaultConfig,
  WalletKitOptions,
  SwitchNetworkModal,
} from '@totejs/walletkit';
import {
  binanceWeb3Wallet,
  coinbaseWallet,
  mathWallet,
  metaMask,
  okxWallet,
  tokenPocket,
  trustWallet,
  walletConnect,
} from '@totejs/walletkit/wallets';

import { chains } from './chains';
import { Box, useColorMode } from '@totejs/uikit';

const config = createConfig(
  getDefaultConfig({
    appName: 'WalletKit',
    chains,
    walletConnectProjectId: 'e68a1816d39726c2afabf05661a32767', //
    autoConnect: false,
    connectors: [
      trustWallet(),
      metaMask(),
      binanceWeb3Wallet(),
      okxWallet(),
      coinbaseWallet(),
      mathWallet(),
      tokenPocket(),
      walletConnect(),
    ],
  }),
);

const options: WalletKitOptions = {
  initialChainId: 56, // Once connected to the wallet, which chain you want to use
  chainsConfig: [],
};

export default function App() {
  const { colorMode } = useColorMode();

  return (
    <Box borderRadius={8} border="1px solid readable.border" p={16}>
      <WagmiConfig config={config}>
        <WalletKitProvider options={options} mode={colorMode}>
          <WalletKitButton />
          <SwitchNetworkModal />
        </WalletKitProvider>
      </WagmiConfig>
    </Box>
  );
}
