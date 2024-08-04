import { getGlobalData } from '@/globalData';
import { WalletProps } from '..';
import { hasInjectedProvider } from '../utils';
import {
  coinbaseWallet as wagmiCoinbaseWallet,
  type CoinbaseWalletParameters,
} from 'wagmi/connectors';
import { CoinbaseWalletIcon, CoinbaseWalletTransparentIcon } from '@node-real/walletkit-ui';

const COINBASE_WALLET_ID = 'coinbaseWalletSDK';
const COINBASE_WALLET_NAME = 'Coinbase Wallet';

export interface CoinbaseWalletOptions extends Partial<WalletProps> {
  connectorOptions?: CoinbaseWalletParameters;
}

export function coinbaseWallet(props: CoinbaseWalletOptions = {}): WalletProps {
  const { connectorOptions, ...restProps } = props;

  return {
    id: COINBASE_WALLET_ID,
    name: COINBASE_WALLET_NAME,
    logos: {
      default: <CoinbaseWalletIcon />,
      transparent: <CoinbaseWalletTransparentIcon />,
    },
    downloadUrls: {
      default: 'https://www.coinbase.com/wallet/downloads',
    },
    spinnerColor: undefined,
    showQRCode: false,
    isInstalled: hasInjectedCoinbaseWallet,
    getDeepLink: () => {
      return `https://go.cb-w.com/dapp?cb_url=${encodeURIComponent(window.location.href)}`;
    },
    getQRCodeUri: (uri) => {
      return uri;
    },
    getCreateConnectorFn: () => {
      const { appName, appIcon } = getGlobalData();

      return wagmiCoinbaseWallet({
        appName,
        headlessMode: true,
        appLogoUrl: appIcon,
        ...connectorOptions,
      });
    },
    ...restProps,
  };
}

export function hasInjectedCoinbaseWallet() {
  if (typeof window === 'undefined') return false;

  return hasInjectedProvider('isCoinbaseWallet') || !!window.coinbaseWalletExtension;
}
