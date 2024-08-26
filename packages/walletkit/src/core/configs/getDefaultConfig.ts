import { WalletKitConfig, WalletKitContextProps } from '../providers/WalletKitProvider/context';
import { toast } from '@/core/base/components/toast';
import { SolanaConfig } from '@/solana/utils/solanaConfig';
import { EvmConfig } from '@/evm/utils/evmConfig';

type DefaultConfig = Pick<WalletKitContextProps, 'appearance' | 'eventConfig' | 'walletConfig'>;

export function getDefaultConfig(config: WalletKitConfig): DefaultConfig {
  const { appearance, eventConfig, walletConfigs } = config;

  const evmConfig = walletConfigs.find((item) => item.walletType === 'evm') as EvmConfig;
  const solanaConfig = walletConfigs.find((item) => item.walletType === 'solana') as SolanaConfig;

  return {
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

      ...appearance,
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
      ...eventConfig,
    },

    walletConfig: {
      evmConfig,
      solanaConfig,
    },
  };
}
