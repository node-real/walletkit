import { WalletKitConfig } from '../providers/WalletKitProvider/context';
import { toast } from '@/core/base/components/toast';
import { setGlobalData } from '@/core/globalData';

export function getDefaultConfig(config: WalletKitConfig) {
  const finalConfig: WalletKitConfig = {
    appearance: {
      mode: 'auto',
      theme: undefined,

      title: 'Connect Wallet',
      disclaimer: undefined,
      gridLayoutThreshold: 6,
      useGridLayoutOnMobile: true,

      hideNoWalletCTA: false,
      hideOfficialWalletConnectCTA: true,

      walletDownloadUrl: `https://trustwallet.com/`,

      ...config.appearance,
    },

    eventConfig: {
      closeModalAfterSwitchingNetwork: false,
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
      ...config.eventConfig,
    },

    walletConfig: {
      autoConnect: true,
      walletConnectProjectId: 'e68a1816d39726c2afabf05661a32767', // TODO
      ...config.walletConfig,
      metadata: {
        name: 'Connect Wallet',
        ...config.walletConfig?.metadata,
      },
      evmConfig: config.walletConfig?.evmConfig,
      solanaConfig: config.walletConfig?.solanaConfig,
    },
  };

  setGlobalData({
    metadata: finalConfig.walletConfig?.metadata,
    walletConnectProjectId: finalConfig.walletConfig?.walletConnectProjectId,
    solanaRpcUrl: finalConfig.walletConfig?.solanaConfig?.rpcUrl,
  });

  return finalConfig;
}
