import { useWalletKit } from '@/components/WalletKitProvider/context';
import { useQRCodeUri } from '@/hooks/useQRCodeUri';
import { useWalletConfig } from '@/hooks/useWalletConfig';
import { useWalletConnectModal } from '@/hooks/useWalletConnectModal';
import { DataSource } from '@node-real/walletkit-ui';

export function useConnectWithQRCodeView(): ReturnType<DataSource['useConnectWithQRCodeView']> {
  const { selectedConnector } = useWalletKit();

  const wallet = useWalletConfig(selectedConnector?.id);
  const wcUri = useQRCodeUri();

  const wcModal = useWalletConnectModal();
  const qrCodeUri = wcUri && (wallet.getQRCodeUri?.(wcUri) ?? wcUri);

  return {
    qrCodeUri: qrCodeUri,
    onClickOpenWcModal: wcModal.onOpen,
  };
}
