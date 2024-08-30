import { metaMaskConfig } from '@/core/configs/metaMask';
import { hasEvmInjectedProvider } from '../utils';
import { metaMask as wagmiMetaMask, type MetaMaskParameters } from 'wagmi/connectors';

import { EvmWallet } from '../types';

interface MetaMaskOptions extends Partial<EvmWallet> {
  connectorOptions?: MetaMaskParameters;
}

export function metaMask(props: MetaMaskOptions = {}): EvmWallet {
  const { connectorOptions, ...restProps } = props;

  return {
    ...metaMaskConfig,
    id: 'metaMask',
    walletType: 'evm',
    showQRCode: false,
    connectWithUri: false,
    isInstalled() {
      return hasEvmInjectedProvider('isMetaMask');
    },
    getDeepLink() {
      const dappPath = window.location.href.replace(/^https?:\/\//, '');
      return `metamask://dapp/${dappPath}`;
    },
    getUri(uri) {
      const wcUri = `wc?uri=${encodeURIComponent(uri)}`;
      return `metamask://${wcUri}`;
    },
    getCreateConnectorFn() {
      return wagmiMetaMask({
        // injectProvider: false,
        // useDeeplink: true,
        // modals: {
        //   install() {
        //     return {};
        //   },
        // },
        // ui: {
        //   installer() {
        //     return {};
        //   },
        //   confirm() {
        //     return {};
        //   },
        // },
        ...connectorOptions,
      });
    },
    ...restProps,
  };
}

export function isMetaMask(id?: string) {
  return id === metaMask().id;
}
