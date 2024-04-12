import { Box } from '@node-real/uikit';
import { SwitchNetworkModal, WalletKitButton, WalletKitEmbeddedModal } from '@node-real/walletkit';

export function BaseExample() {
  return (
    <Box borderRadius={8} border="1px solid readable.border" p={16}>
      <WalletKitButton />
    </Box>
  );
}

export function EmbeddedExample() {
  return (
    <Box borderRadius={8} border="1px solid readable.border" p={16}>
      <WalletKitEmbeddedModal />
      <SwitchNetworkModal />
    </Box>
  );
}
