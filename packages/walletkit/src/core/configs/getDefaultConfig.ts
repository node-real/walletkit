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
      hideOfficialWalletConnectCTA: false,

      walletDownloadUrl: `https://trustwallet.com/`,

      ...config.appearance,
    },
    events: {
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
      ...config.events,
    },
    walletSetting: {
      autoConnect: true,
      walletConnectProjectId: 'e68a1816d39726c2afabf05661a32767', // TODO
      ...config.walletSetting,
      metadata: {
        name: 'Connect Wallet',
        ...config.walletSetting?.metadata,
      },
      evm: config.walletSetting?.evm,
      solana: config.walletSetting?.solana,
    },
  };

  setGlobalData({
    metadata: finalConfig.walletSetting?.metadata,
    walletConnectProjectId: finalConfig.walletSetting?.walletConnectProjectId,
    solanaRpcUrl: finalConfig.walletSetting?.solana?.rpcUrl,
  });

  return finalConfig;
}
