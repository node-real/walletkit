import { toast } from '@/base/components/toast';
import { WalletKitOptions } from '..';

export function getDefaultProviderOptions(options: WalletKitOptions) {
  const { ...restOptions } = options;

  const mergedOptions: WalletKitOptions = {
    disclaimer: undefined,
    chainsConfig: undefined,

    hideNoWalletCTA: false,
    hideOfficialWalletConnectCTA: false,

    closeModalAfterSwitchingNetwork: false,
    closeModalAfterConnected: true,
    closeModalOnEsc: true,
    closeModalOnOverlayClick: true,

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
