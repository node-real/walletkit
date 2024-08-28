import {
  coinbaseWallet as wagmiCoinbaseWallet,
  type CoinbaseWalletParameters,
} from 'wagmi/connectors';
import { coinbaseWalletConfig } from '@/core/configs/coinbaseWallet';
import { EvmWallet } from '../types';
import { getEvmInjectedProvider } from '../utils';
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
    useWalletConnect: false,
    isInstalled() {
      return !!getProvider();
    },
    getDeepLink() {
      return `https://go.cb-w.com/dapp?cb_url=${encodeURIComponent(window.location.href)}`;
    },
    getUri(uri) {
      return uri;
    },
    getCreateConnectorFn() {
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

function getProvider() {
  if (typeof window === 'undefined') return;
  return getEvmInjectedProvider('isCoinbaseWallet') || window.coinbaseWalletExtension;
}
