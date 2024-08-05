import { toast } from '../base/components/toast';
import { DataSource } from '../types';

// TODO
export const WALLET_CONNECT_PROJECT_ID = 'e68a1816d39726c2afabf05661a32767';

export enum CONNECT_STATUS {
  CONNECTED = 'connected',
  CONNECTING = 'connecting',
  FAILED = 'failed',
  REJECTED = 'rejected',
  NOTCONNECTED = 'notconnected',
  UNAVAILABLE = 'unavailable',
}

export const DEFAULT_OPTIONS: DataSource['options'] = {
  title: 'Connect Wallet',
  disclaimer: undefined,
  gridLayoutThreshold: 6,
  useGridLayoutOnMobile: true,

  hideNoWalletCTA: false,
  hideOfficialWalletConnectCTA: false,

  closeModalAfterSwitchingNetwork: false,
  closeModalAfterConnected: true,
  closeModalOnEsc: true,
  closeModalOnOverlayClick: true,

  openModalOnWrongNetwork: false,

  walletDownloadUrl: `https://trustwallet.com/`,

  onError(err: any, description: string) {
    if (description) {
      toast.error({
        description,
      });
    }
  },
};
