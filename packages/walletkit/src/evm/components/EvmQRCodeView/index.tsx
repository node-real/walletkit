import { TemplateQRCodeView } from '@/core/modals/ConnectModal/TemplateQRCodeView';
import { useWalletKit } from '@/core/providers/WalletKitProvider/context';
import { useIsConnected } from '@/evm/hooks/useIsConnected';
import { useWalletConnectUri } from '@/evm/hooks/useWalletConnectUri';
import { useWalletConnectModal } from '@/evm/hooks/useWalletConnectModal';
import { EvmWallet, isWalletConnect, metaMask } from '@/evm/wallets';
import { useMetaMaskUri } from '@/evm/hooks/userMetaMaskUri';

export function EvmQRCodeView() {
  const { selectedWallet } = useWalletKit();

  const { wcUri } = useWalletConnectUri({
    enabled: selectedWallet.id !== metaMask().id,
  });
  const { metaMaskUri } = useMetaMaskUri({
    enabled: selectedWallet.id === metaMask().id,
  });

  const qrCodeUri =
    selectedWallet.id === metaMask().id
      ? metaMaskUri
      : wcUri
        ? (selectedWallet as EvmWallet).getUri?.(wcUri)
        : wcUri;

  const wcModal = useWalletConnectModal();
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
