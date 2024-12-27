import { WalletKitConfig, WalletKitContextProps } from '../providers/WalletKitProvider/context';
import { toast } from '@/core/base/components/toast';

type DefaultConfig = Pick<
  WalletKitContextProps,
  'options' | 'evmConfig' | 'solanaConfig' | 'tronConfig'
>;

export function getDefaultConfig(config: WalletKitConfig): DefaultConfig {
  const { options, evmConfig, solanaConfig, tronConfig } = config;

  return {
    options: {
      title: 'Connect Wallet',
      disclaimer: undefined,
      gridLayoutThreshold: 6,
      useGridLayoutOnMobile: true,

      hideNoWalletCTA: false,
      hideOfficialWalletConnectCTA: true,

      walletDownloadUrl: `https://trustwallet.com/`,

      closeModalAfterSwitchingNetwork: true,
      closeModalAfterConnected: true,
      closeModalOnEsc: true,
      closeModalOnOverlayClick: true,
      openModalOnWrongNetwork: false,

      onError(_err: any, description: string) {
        if (description) {
          toast.error({
            description,
          });
        }
      },

      ...options,
    },

    evmConfig,
    solanaConfig,
    tronConfig,
  };
}
