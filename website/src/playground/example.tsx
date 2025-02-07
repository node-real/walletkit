import { Box, Button, Flex, Text } from '@node-real/uikit';
import { useDisconnect, useAccount } from 'wagmi';
import {
  SwitchNetworkModal,
  EmbeddedConnectModal,
  ConnectModal,
  useSwitchNetworkModal,
  ConnectButton,
} from '@node-real/walletkit';
import { useSolanaWallet } from '@node-real/walletkit/solana';
import { useTronWallet } from '@node-real/walletkit/tron';
import { Playground } from './Playground';

export function BaseExample() {
  const Content = () => {
    const { isConnected } = useAppAccount();

    return (
      <Box borderRadius={8} border="1px solid readable.border" p={16}>
        {isConnected ? <ConnectedInfo /> : <ConnectButton />}
        <ConnectModal />
      </Box>
    );
  };

  return (
    <Playground>
      <Content />
    </Playground>
  );
}

export function EmbeddedExample() {
  const Content = () => {
    const { isConnected } = useAppAccount();
    return (
      <Box borderRadius={8} border="1px solid readable.border" p={16}>
        {isConnected ? <ConnectedInfo /> : <EmbeddedConnectModal />}
      </Box>
    );
  };

  return (
    <Playground>
      <Content />
    </Playground>
  );
}

function ConnectedInfo() {
  const { chainType, address, disconnect } = useAppAccount();
  const { onOpen } = useSwitchNetworkModal();

  return (
    <Flex flexDir="column">
      <Flex align="center" gap={12}>
        {chainType === 'evm' && (
          <Button size="sm" onClick={() => onOpen()}>
            open switch network modal
          </Button>
        )}
      </Flex>

      <Flex align="center" gap={12}>
        <Text>
          {chainType} address: {address}
        </Text>
        <Button size="md" onClick={() => disconnect()}>
          disconnect
        </Button>
      </Flex>

      <SwitchNetworkModal />
    </Flex>
  );
}

function useAppAccount() {
  const { disconnect } = useDisconnect();
  const evm = useAccount();
  const solana = useSolanaWallet();
  const tron = useTronWallet();

  if (solana.connected) {
    return {
      chainType: 'solana',
      address: solana.publicKey?.toBase58(),
      isConnected: !!solana.publicKey,
      disconnect: solana.disconnect,
    };
  } else if (tron.connected) {
    return {
      chainType: 'tron',
      address: tron.address,
      isConnected: !!tron.address,
      disconnect: tron.disconnect,
    };
  } else {
    return {
      chainType: 'evm',
      address: evm.address,
      isConnected: evm.isConnected,
      disconnect,
    };
  }
}
