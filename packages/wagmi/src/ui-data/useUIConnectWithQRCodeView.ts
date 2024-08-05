import { useWalletKit } from '@/core/components/WalletKitProvider/context';
import { useQRCodeUri } from '@/core/hooks/useQRCodeUri';
import { useWalletConfig } from '@/core/hooks/useWalletConfig';
import { useWalletConnectModal } from '@/core/hooks/useWalletConnectModal';
import { DataSource } from '@/ui/types';

export function useUIConnectWithQRCodeView(): ReturnType<DataSource['useConnectWithQRCodeView']> {
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
