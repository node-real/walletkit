import { WalletKitConfig, WalletKitContextProps } from '../providers/WalletKitProvider/context';
import { toast } from '@/core/base/components/toast';
import { SolanaConfig } from '@/solana/utils/solanaConfig';
import { EvmConfig } from '@/evm/utils/evmConfig';

type DefaultConfig = Pick<WalletKitContextProps, 'appearance' | 'eventConfig' | 'walletConfig'>;

export function getDefaultConfig(config: WalletKitConfig): DefaultConfig {
  const evmConfig = config.walletConfigs.find((item) => item.walletType === 'evm') as EvmConfig;

  const solanaConfig = config.walletConfigs.find(
    (item) => item.walletType === 'solana',
  ) as SolanaConfig;

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
      evmConfig,
      solanaConfig,
    },
  };
}

export const WALLET_CONNECT_PROJECT_ID = 'e68a1816d39726c2afabf05661a32767';
