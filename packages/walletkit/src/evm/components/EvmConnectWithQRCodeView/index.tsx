import { ConnectWithQRCode } from '@/core/modals/ConnectModal/ConnectWithQRCode';
import { useSelectedWallet } from '@/core/providers/WalletKitProvider/context';
import { useEvmIsConnected } from '@/evm/hooks/useEvmIsConnected';
import { useWalletConnectUri } from '@/evm/hooks/useWalletConnectUri';
import { useWalletConnectModal } from '@/evm/hooks/useWalletConnectModal';
import { EvmWallet, isWalletConnect } from '@/evm/wallets';

export function EvmConnectWithQRCodeView() {
  const { selectedWallet } = useSelectedWallet();

  const wcUri = useWalletConnectUri();
  const wcModal = useWalletConnectModal();
  const qrCodeUri = wcUri && ((selectedWallet as EvmWallet).getUri?.(wcUri) ?? wcUri);
  const isConnected = useEvmIsConnected();

  return (
    <ConnectWithQRCode
      wallet={selectedWallet}
      qrCodeUri={qrCodeUri}
      onClickOpenWcModal={wcModal.onOpen}
      isConnected={isConnected}
      isWalletConnect={isWalletConnect(selectedWallet.id)}
    />
  );
}
