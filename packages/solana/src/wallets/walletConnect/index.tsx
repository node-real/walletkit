import { getGlobalData } from '@/globalData';
import { WalletProps } from '..';
import { isMobile, WalletConnectIcon, WalletConnectTransparentIcon } from '@node-real/walletkit-ui';
import {
  WalletConnectWalletAdapter,
  WalletConnectWalletAdapterConfig,
} from '@walletconnect/solana-adapter';

const WALLET_CONNECT_ID = 'WalletConnect';
const WALLET_CONNECT_NAME = 'WalletConnect';

export interface WalletConnectOptions extends Partial<WalletProps> {
  adapterOptions?: Partial<WalletConnectWalletAdapterConfig>;
}

export function walletConnect(props: WalletConnectOptions = {}): WalletProps {
  const { adapterOptions, ...restProps } = props;

  return {
    id: WALLET_CONNECT_ID,
    name: WALLET_CONNECT_NAME,
    logos: {
      default: <WalletConnectIcon />,
      transparent: <WalletConnectTransparentIcon />,
    },
    downloadUrls: {
      default: undefined,
    },
    showQRCode: isMobile() ? false : true,
    isInstalled: () => false,
    getAdapter: () => {
      const { walletConnectProjectId, appName, appIcon, appDescription, appUrl, rpcUrl } =
        getGlobalData();

      const hasAllAppData = appName && appIcon && appDescription && appUrl;

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
                name: appName,
                description: appDescription!,
                url: appUrl!,
                icons: [appIcon!],
              }
            : undefined,
          ...adapterOptions,
        },
      });
    },
    ...restProps,
  };
}
