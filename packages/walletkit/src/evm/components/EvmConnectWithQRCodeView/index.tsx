import { TemplateConnectWithQRCodeView } from '@/core/modals/ConnectModal/TemplateConnectWithQRCodeView';
import { useWalletKit } from '@/core/providers/WalletKitProvider/context';
import { useIsConnected } from '@/evm/hooks/useIsConnected';
import { useWalletConnectUri } from '@/evm/hooks/useWalletConnectUri';
import { useWalletConnectModal } from '@/evm/hooks/useWalletConnectModal';
import { EvmWallet, isWalletConnect } from '@/evm/wallets';

export function EvmConnectWithQRCodeView() {
  const { selectedWallet } = useWalletKit();

  const { wcUri } = useWalletConnectUri();
  const wcModal = useWalletConnectModal();
  const qrCodeUri = wcUri && ((selectedWallet as EvmWallet).getUri?.(wcUri) ?? wcUri);
  const isConnected = useIsConnected();

  return (
    <TemplateConnectWithQRCodeView
      wallet={selectedWallet}
      qrCodeUri={qrCodeUri}
      onClickOpenWcModal={wcModal.onOpen}
      isConnected={isConnected}
      isWalletConnect={isWalletConnect(selectedWallet.id)}
    />
  );
}
