import { TemplateConnectWithQRCodeView } from '@/core/modals/ConnectModal/TemplateConnectWithQRCodeView';
import { useSelectedWallet } from '@/core/providers/WalletKitProvider/context';
import { useEvmIsConnected } from '@/evm/hooks/useEvmIsConnected';
import { useEvmWalletConnectUri } from '@/evm/hooks/useEvmWalletConnectUri';
import { useWalletConnectModal } from '@/evm/hooks/useWalletConnectModal';
import { EvmWallet, isWalletConnect } from '@/evm/wallets';

export function EvmConnectWithQRCodeView() {
  const { selectedWallet } = useSelectedWallet();

  const { wcUri } = useEvmWalletConnectUri();
  const wcModal = useWalletConnectModal();
  const qrCodeUri = wcUri && ((selectedWallet as EvmWallet).getUri?.(wcUri) ?? wcUri);
  const isConnected = useEvmIsConnected();

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
