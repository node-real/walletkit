import { Chain } from 'wagmi';

import { PartialWalletProps, WalletProps } from '../types';
import { CoinbaseWalletIcon } from './icon';
import { hasInjectedProvider } from '../utils';
import { getGlobalData } from '../../globalData';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';

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
    },
    downloadUrls: {
      default: 'https://coinbase.com/wallet',
    },
    spinnerColor: undefined,
    installed: isCoinbaseWallet(),
    createConnector: (chains: Chain[]) => {
      const { walletConnectDefaultOptions } = getGlobalData();
      const { appName } = walletConnectDefaultOptions;

      return new CoinbaseWalletConnector({
        chains,
        options: {
          appName,
          headlessMode: true,
          ...connectorOptions,
        },
      });
    },
    getUri: () => {
      return `https://go.cb-w.com/dapp?cb_url=${encodeURIComponent(window.location.href)}`;
    },
    ...restProps,
  };
}

export function isCoinbaseWallet() {
  if (typeof window === 'undefined') return false;

  return hasInjectedProvider('isCoinbaseWallet');
}
