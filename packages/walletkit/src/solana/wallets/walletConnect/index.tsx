import {
  WalletConnectWalletAdapter,
  WalletConnectWalletAdapterConfig,
} from '@solana/wallet-adapter-wallets';
import { SolanaWallet } from '../types';
import { isMobile } from '@/core/base/utils/mobile';
import { walletConnectConfig } from '@/core/configs/walletConnect';
import { getSolanaGlobalData } from '@/solana/globalData';

interface WalletConnectOptions extends Partial<SolanaWallet> {
  adapterOptions?: Partial<WalletConnectWalletAdapterConfig>;
}

export function walletConnect(props: WalletConnectOptions = {}): SolanaWallet {
  const { adapterOptions, ...restProps } = props;

  return {
    ...walletConnectConfig,
    id: 'solana:walletConnect',
    walletType: 'solana',
    adapterName: 'WalletConnect',
    showQRCode: isMobile() ? false : true,
    isInstalled: () => false,
    getAdapter: () => {
      const { walletConnectProjectId, metadata, rpcUrl } = getSolanaGlobalData();

      const hasAllAppData = metadata?.name && metadata.icon && metadata.description && metadata.url;

      if (!walletConnectProjectId) {
        throw new Error('walletConnectProjectId is required.');
      }

      return new WalletConnectWalletAdapter({
        network: rpcUrl as any,
        options: {
          // https://github.com/WalletConnect/walletconnect-monorepo/issues/2830
          relayUrl: 'wss://relay.walletconnect.org',
          projectId: walletConnectProjectId,
          metadata: hasAllAppData
            ? {
                name: metadata.name,
                description: metadata.description!,
                url: metadata.url!,
                icons: [metadata.icon!],
              }
            : undefined,
          ...adapterOptions,
        },
      });
    },
    ...restProps,
  };
}

export function isWalletConnect(id: string) {
  return id === walletConnect().id;
}
