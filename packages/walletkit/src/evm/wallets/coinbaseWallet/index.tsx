import {
  coinbaseWallet as wagmiCoinbaseWallet,
  type CoinbaseWalletParameters,
} from 'wagmi/connectors';
import { coinbaseWalletConfig } from '@/core/configs/coinbaseWallet';
import { EvmWallet } from '../types';
import { hasInjectedEvmProvider } from '../utils';
import { getEvmGlobalData } from '@/evm/globalData';

interface CoinbaseWalletOptions extends Partial<EvmWallet> {
  connectorOptions?: CoinbaseWalletParameters;
}

export function coinbaseWallet(props: CoinbaseWalletOptions = {}): EvmWallet {
  const { connectorOptions, ...restProps } = props;

  return {
    ...coinbaseWalletConfig,
    id: 'coinbaseWalletSDK',
    walletType: 'evm',
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
      const { metadata } = getEvmGlobalData();

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
