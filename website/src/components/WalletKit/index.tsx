import {
  WagmiConfig,
  createConfig,
  useAccount,
  useDisconnect,
  useNetwork,
  useSwitchNetwork,
} from 'wagmi';

import {
  WalletKitButton,
  WalletKitProvider,
  getDefaultConfig,
  WalletKitOptions,
  SwitchNetworkModal,
} from '@totejs/walletkit';
import { metaMask, trustWallet, walletConnect } from '@totejs/walletkit/wallets';

import { chains } from './chains';
import { Box, Button, HStack, useColorMode } from '@totejs/uikit';

const config = createConfig(
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
    <WagmiConfig config={config}>
      <WalletKitProvider options={options} mode={colorMode}>
        <Example />
      </WalletKitProvider>
    </WagmiConfig>
  );
}

function Example() {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { disconnect } = useDisconnect();
  const { switchNetwork } = useSwitchNetwork();

  return (
    <Box borderRadius={8} border="1px solid readable.border" p={16}>
      <Box>address: {address}</Box>
      <Box>chainId: {chain?.id}</Box>
      {isConnected ? (
        <HStack>
          <Button colorScheme="danger" onClick={() => disconnect()}>
            disconnect
          </Button>
          <Button onClick={() => switchNetwork?.(56)}>chainId 56</Button>
          <Button onClick={() => switchNetwork?.(97)}>chainId 97</Button>
          <Button onClick={() => switchNetwork?.(204)}>chainId 204</Button>
          <Button onClick={() => switchNetwork?.(5600)}>chainId 5600</Button>
        </HStack>
      ) : (
        <WalletKitButton.Custom>
          {({ show }) => {
            return <Button onClick={show}>connect</Button>;
          }}
        </WalletKitButton.Custom>
      )}

      <SwitchNetworkModal />
    </Box>
  );
}
