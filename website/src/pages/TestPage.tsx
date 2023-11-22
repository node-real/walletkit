import { WagmiConfig, createConfig, mainnet } from 'wagmi';

import {
  WalletKitButton,
  WalletKitProvider,
  getDefaultConfig,
  WalletKitOptions,
  SwitchNetworkModal,
} from '@totejs/walletkit';
import {
  trustWallet,
  metaMask,
  walletConnect,
  okxWallet,
  mathWallet,
  binanceWeb3Wallet,
  coinbaseWallet,
  tokenPocket,
} from '@totejs/walletkit/wallets';

import { Box, useColorMode } from '@totejs/uikit';
import { bsc } from 'wagmi/chains';

const config = createConfig(
  getDefaultConfig({
    appName: 'WalletKit',
    chains: [bsc, mainnet],
    walletConnectProjectId: 'e68a1816d39726c2afabf05661a32767', //
    autoConnect: false,
    connectors: [
      trustWallet(),
      metaMask(),
      okxWallet(),
      mathWallet(),
      binanceWeb3Wallet(),
      coinbaseWallet(),
      walletConnect(),
      tokenPocket(),
    ],
  }),
);

const options: WalletKitOptions = {
  initialChainId: 56, // Once connected to the wallet, which chain you want to use
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
