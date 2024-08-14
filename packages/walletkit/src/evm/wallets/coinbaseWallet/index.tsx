import {
  coinbaseWallet as wagmiCoinbaseWallet,
  type CoinbaseWalletParameters,
} from 'wagmi/connectors';
import { getGlobalData } from '@/core/globalData';
import { coinbaseWalletConfig } from '@/core/configs/wallets/coinbaseWallet';
import { EvmWallet } from '../types';
import { hasInjectedEvmProvider } from '../utils';

interface CoinbaseWalletOptions extends Partial<EvmWallet> {
  connectorOptions?: CoinbaseWalletParameters;
}

export function coinbaseWallet(props: CoinbaseWalletOptions = {}): EvmWallet {
  const { connectorOptions, ...restProps } = props;

  return {
    ...coinbaseWalletConfig,
    showQRCode: false,
    isInstalled: () => {
      if (typeof window === 'undefined') return false;

      return hasInjectedEvmProvider('isCoinbaseWallet') || !!window.coinbaseWalletExtension;
    },
    getDeepLink: () => {
      return `https://go.cb-w.com/dapp?cb_url=${encodeURIComponent(window.location.href)}`;
    },
    getQRCodeUri: (uri) => {
      return uri;
    },
    getCreateConnectorFn: () => {
      const { metadata } = getGlobalData();

      return wagmiCoinbaseWallet({
        appName: metadata!.name,
        headlessMode: true,
        appLogoUrl: metadata?.icon,
        ...connectorOptions,
      });
    },
    ...restProps,
  };
}
