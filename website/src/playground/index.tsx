import { WagmiConfig, createConfig } from 'wagmi';

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
  // particleWallet,
} from '@node-real/walletkit/wallets';
// import { ParticleNetwork } from '@particle-network/auth';

import { chains } from './chains';
import { Box, useColorMode } from '@totejs/uikit';

// const { VITE_PARTICLE_APP_PROJECT_ID, VITE_PARTICLE_APP_CLIENT_KEY, VITE_PARTICLE_APP_APP_ID } =
//   import.meta.env;

// const particle = new ParticleNetwork({
//   projectId: VITE_PARTICLE_APP_PROJECT_ID,
//   clientKey: VITE_PARTICLE_APP_CLIENT_KEY,
//   appId: VITE_PARTICLE_APP_APP_ID,
//   wallet: { displayWalletEntry: true },
// });

// particle.setERC4337({
//   name: 'BICONOMY',
//   version: '2.0.0',
// });

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
      // particleWallet(),
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
      <WagmiConfig config={config}>
        <WalletKitProvider options={options} mode={colorMode}>
          <WalletKitButton />
          <SwitchNetworkModal />
        </WalletKitProvider>
      </WagmiConfig>
    </Box>
  );
}
