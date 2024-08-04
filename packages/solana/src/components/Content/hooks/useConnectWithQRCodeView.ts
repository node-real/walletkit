import { DataSource } from '@node-real/walletkit-ui';

export function useConnectWithQRCodeView(): ReturnType<DataSource['useConnectWithQRCodeView']> {
  return {
    qrCodeUri: '',
    onClickOpenWcModal: () => undefined,
  };
}
