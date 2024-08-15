import { ConnectWithQRCode } from '@/core/modals/ConnectModal/ConnectWithQRCode';
import { useSelectedWallet } from '@/core/providers/WalletKitProvider/context';
import { useIsConnected } from '@/evm/hooks/useIsConnected';
import { useQRCodeUri } from '@/evm/hooks/useQRCodeUri';
import { useWalletConnectModal } from '@/evm/hooks/useWalletConnectModal';
import { EvmWallet, isWalletConnect } from '@/evm/wallets';

export function EvmConnectWithQRCodeView() {
  const { selectedWallet } = useSelectedWallet();

  const wcUri = useQRCodeUri();
  const wcModal = useWalletConnectModal();
  const qrCodeUri = wcUri && ((selectedWallet as EvmWallet).getQRCodeUri?.(wcUri) ?? wcUri);
  const isConnected = useIsConnected();

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
