import { WalletKitConfig } from '../providers/WalletKitProvider/context';
import { toast } from '@/core/base/components/toast';
import { setGlobalData } from '@/core/globalData';
import { mainnet } from 'viem/chains';

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

      closeModalAfterSwitchingNetwork: false,
      closeModalAfterConnected: true,
      closeModalOnEsc: true,
      closeModalOnOverlayClick: true,

      openModalOnWrongNetwork: false,

      walletDownloadUrl: `https://trustwallet.com/`,

      ...config.appearance,
    },
    eventHandlers: {
      onError(_err: any, description: string) {
        if (description) {
          toast.error({
            description,
          });
        }
      },
      ...config.eventHandlers,
    },
    wallet: {
      autoConnect: true,
      walletConnectProjectId: 'e68a1816d39726c2afabf05661a32767', // TODO
      ...config.wallet,
      metadata: {
        name: 'Connect Wallet',
        ...config.wallet.metadata,
      },
      evm: {
        initialChainId: undefined,
        ...config.wallet.evm,

        chains: config.wallet.evm.chains ?? [mainnet],
        wallets: config.wallet.evm.wallets ?? [],
      },
      solana: config.wallet.solana,
    },
  };

  setGlobalData({
    metadata: finalConfig.wallet.metadata,
    walletConnectProjectId: finalConfig.wallet.walletConnectProjectId,
    solanaRpcUrl: finalConfig.wallet.solana?.rpcUrl,
  });

  return finalConfig;
}
