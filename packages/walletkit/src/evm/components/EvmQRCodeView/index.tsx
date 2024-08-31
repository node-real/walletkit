import { TemplateQRCodeView } from '@/core/modals/ConnectModal/TemplateQRCodeView';
import { useWalletKit } from '@/core/providers/WalletKitProvider/context';
import { useIsConnected } from '@/evm/hooks/useIsConnected';
import { useWalletConnectUri } from '@/evm/hooks/useWalletConnectUri';
import { useWalletConnectModal } from '@/evm/hooks/useWalletConnectModal';
import { EvmWallet, isWalletConnect } from '@/evm/wallets';

export function EvmQRCodeView() {
  const { selectedWallet } = useWalletKit();

  const { wcUri } = useWalletConnectUri();
  const wcModal = useWalletConnectModal();
  const qrCodeUri = wcUri && ((selectedWallet as EvmWallet).getQrCodeUri?.(wcUri) ?? wcUri);
  const isConnected = useIsConnected();

  return (
    <TemplateQRCodeView
      wallet={selectedWallet}
      qrCodeUri={qrCodeUri}
      onClickOpenWcModal={wcModal.onOpen}
      isConnected={isConnected}
      isWalletConnect={isWalletConnect(selectedWallet.id)}
    />
  );
}
