import { WagmiConfig, createClient } from 'wagmi';

import {
  WalletKitButton,
  WalletKitProvider,
  getDefaultConfig,
  WalletKitOptions,
  SwitchNetworkModal,
} from '@totejs/walletkit';
import { metaMask, trustWallet, walletConnect } from '@totejs/walletkit/wallets';

import { chains } from './chains';
import { Box, useColorMode } from '@totejs/uikit';

const client = createClient(
  getDefaultConfig({
    appName: 'WalletKit',
    chains,
    walletConnectProjectId: 'e68a1816d39726c2afabf05661a32767', //
    autoConnect: false,
    connectors: [trustWallet(), metaMask(), walletConnect()],
  }),
);

const options: WalletKitOptions = {
  initialChainId: 56, // Once connected to the wallet, which chain you want to use
};

export default function App() {
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
