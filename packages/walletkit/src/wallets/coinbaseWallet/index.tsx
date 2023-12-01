import { getGlobalData } from '@/globalData';
import { Chain } from 'wagmi';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { PartialWalletProps, WalletProps } from '..';
import { hasInjectedProvider } from '../utils';
import { CoinbaseWalletIcon, CoinbaseWalletTransparentIcon } from './icon';

export const COINBASE_WALLET_ID = 'coinbaseWallet';

export type CoinbaseWalletConnectorOptions = Required<
  ConstructorParameters<typeof CoinbaseWalletConnector>
>[0]['options'];

export interface CoinbaseWalletProps extends PartialWalletProps {
  connectorOptions?: CoinbaseWalletConnectorOptions;
}

export function coinbaseWallet(props: CoinbaseWalletProps = {}): WalletProps {
  const { connectorOptions, ...restProps } = props;

  return {
    id: COINBASE_WALLET_ID,
    name: 'Coinbase Wallet',
    logos: {
      default: <CoinbaseWalletIcon />,
      transparent: <CoinbaseWalletTransparentIcon />,
    },
    downloadUrls: {
      default: 'https://www.coinbase.com/wallet/downloads',
    },
    spinnerColor: undefined,
    showQRCode: false,
    isInstalled: isCoinbaseWallet,
    createConnector: (chains: Chain[]) => {
      const { appName } = getGlobalData();

      return new CoinbaseWalletConnector({
        chains,
        options: {
          appName,
          headlessMode: true,
          ...connectorOptions,
        },
      });
    },
    getDeepLink: () => {
      return `https://go.cb-w.com/dapp?cb_url=${encodeURIComponent(window.location.href)}`;
    },
    getQRCodeUri(uri) {
      return uri;
    },
    ...restProps,
  };
}

export function isCoinbaseWallet() {
  if (typeof window === 'undefined') return false;

  return hasInjectedProvider('isCoinbaseWallet');
}
