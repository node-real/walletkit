import { DataSource } from '@/ui/types';

export function useUIConnectWithQRCodeView(): ReturnType<DataSource['useConnectWithQRCodeView']> {
  return {
    qrCodeUri: '',
    onClickOpenWcModal: () => undefined,
  };
}
