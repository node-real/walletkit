import { Box } from '@node-real/uikit';
import {
  ProfileModal,
  SwitchNetworkModal,
  WalletKitButton,
  EmbeddedConnectModal,
} from '@node-real/walletkit';

export function BaseExample() {
  return (
    <Box borderRadius={8} border="1px solid readable.border" p={16}>
      <WalletKitButton />
      <SwitchNetworkModal />
    </Box>
  );
}

export function EmbeddedExample() {
  return (
    <Box borderRadius={8} border="1px solid readable.border" p={16}>
      <EmbeddedConnectModal />
      <ProfileModal />
    </Box>
  );
}
