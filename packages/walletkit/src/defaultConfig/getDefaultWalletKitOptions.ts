import { toast } from '@/base/components/toast';
import { WalletKitOptions } from '@/components/WalletKitProvider/context';

export function getDefaultWalletKitOptions(options: WalletKitOptions) {
  const { ...restOptions } = options;

  const mergedOptions: WalletKitOptions = {
    chainsConfig: undefined,

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

    ...restOptions,
  };

  return mergedOptions;
}
