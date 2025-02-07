import {
  coinbaseWallet as wagmiCoinbaseWallet,
  type CoinbaseWalletParameters,
} from 'wagmi/connectors';
import { coinbaseWalletConfig } from '@/core/configs/coinbaseWallet';
import { EvmWallet } from '../types';
import { getEvmInjectedProvider } from '../../utils/getEvmInjectedProvider';
import { getEvmGlobalData } from '@/evm/globalData';

interface CoinbaseWalletOptions extends Partial<EvmWallet> {
  connectorOptions?: Partial<CoinbaseWalletParameters>;
}

export function coinbaseWallet(props: CoinbaseWalletOptions = {}): EvmWallet {
  const { connectorOptions, ...restProps } = props;

  const getProvider = () => {
    if (typeof window === 'undefined') return;
    return getEvmInjectedProvider('isCoinbaseWallet') || window.coinbaseWalletExtension;
  };

  return {
    ...coinbaseWalletConfig,
    id: 'coinbaseWallet',
    walletType: 'evm',
    behaviors: [
      {
        platforms: ['browser-android', 'browser-ios', 'browser-pc'],
        connectType: 'default',
        isInstalled() {
          if (
            connectorOptions &&
            'headlessMode' in connectorOptions &&
            !connectorOptions.headlessMode
          ) {
            return true;
          }
          return !!getProvider();
        },
        getAppLink() {
          return `https://go.cb-w.com/dapp?cb_url=${encodeURIComponent(window.location.href)}`;
        },
        getCreateConnectorFn() {
          const { metadata } = getEvmGlobalData();

          return wagmiCoinbaseWallet({
            appName: metadata!.name,
            headlessMode: true,
            overrideIsMetaMask: false,
            appLogoUrl: metadata?.icon,
            ...connectorOptions,
          });
        },
      },
    ],
    ...restProps,
  };
}
