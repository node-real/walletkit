import { toast } from '@/base/components/toast';
import { WalletKitOptions } from '..';

export function getDefaultProviderOptions(options: WalletKitOptions) {
  const { ...restOptions } = options;

  const mergedOptions: WalletKitOptions = {
    chainsConfig: undefined,

    title: 'Connect Wallet',
    disclaimer: undefined,
    gridLayoutThreshold: 6,
    useGridLayoutOnMobile: true,

    hideNoWalletCTA: false,
    hideOfficialWalletConnectCTA: false,
    hideInnerModal: false,

    closeModalAfterSwitchingNetwork: false,
    closeModalAfterConnected: true,
    closeModalOnEsc: true,
    closeModalOnOverlayClick: true,

    openModalOnWrongNetwork: true,

    walletDownloadUrl: `https://trustwallet.com/`,
    onError,
    ...restOptions,
  };

  return mergedOptions;
}

function onError(_: any, description: string) {
  if (description) {
    toast.error({
      description,
    });
  }
}
