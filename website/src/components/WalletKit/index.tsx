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
  // mathWallet,
  metaMask,
  okxWallet,
  tokenPocket,
  trustWallet,
  walletConnect,
  particleWallet,
} from '@totejs/walletkit/wallets';
import { ParticleNetwork } from '@particle-network/auth';

import { chains } from './chains';
import { Box, useColorMode } from '@totejs/uikit';

//!!! environment variables for testing, use directly
const PARTICLE_APP_APP_ID = '9f8f0969-f7b3-474b-ae93-8773231e6c05';
const PARTICLE_APP_PROJECT_ID = '33eea7b2-d76b-4b5a-978f-4413a6b70e82';
const PARTICLE_APP_CLIENT_KEY = 'clprc7kown00uAKQrWsMOAwzXXiWxYDMq9bpfTta';
const WALLET_CONNECT_PROJECT_ID = 'e68a1816d39726c2afabf05661a32767';

const particle = new ParticleNetwork({
  projectId: PARTICLE_APP_PROJECT_ID as string,
  clientKey: PARTICLE_APP_CLIENT_KEY as string,
  appId: PARTICLE_APP_APP_ID as string,
  wallet: { displayWalletEntry: true },
});

particle.setERC4337({
  name: 'BICONOMY',
  version: '2.0.0',
});

const config = createConfig(
  getDefaultConfig({
    appName: 'WalletKit',
    chains,
    walletConnectProjectId: WALLET_CONNECT_PROJECT_ID,
    autoConnect: false,
    connectors: [
      trustWallet(),
      metaMask(),
      binanceWeb3Wallet(),
      okxWallet(),
      coinbaseWallet(),
      // mathWallet(),
      tokenPocket(),
      particleWallet(),
      walletConnect(),
    ],
  }),
);

const options: WalletKitOptions = {
  initialChainId: 1, // Once connected to the wallet, which chain you want to use
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
