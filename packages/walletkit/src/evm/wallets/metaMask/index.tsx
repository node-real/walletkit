import { metaMaskConfig } from '@/core/configs/metaMask';
import { hasEvmInjectedProvider } from '../utils';
import { EvmWallet } from '../types';
import { MetaMaskParameters, metaMask as metaMaskSDk } from 'wagmi/connectors';
import { openLink } from '@/core/utils/common';

export interface MetaMaskOptions extends Partial<EvmWallet> {
  connectorOptions?: MetaMaskParameters;
}

export function metaMask(props: MetaMaskOptions = {}): EvmWallet {
  const { connectorOptions, ...restProps } = props;

  return {
    ...metaMaskConfig,
    id: 'metaMask',
    walletType: 'evm',
    showQRCode: false,
    isInstalled() {
      return hasEvmInjectedProvider('isMetaMask');
    },
    getDeepLink() {
      const dappPath = window.location.href.replace(/^https?:\/\//, '');
      return `https://metamask.app.link/dapp/${dappPath}`;
    },
    getUri(uri) {
      const encodedUri = encodeURIComponent(uri);
      return `https://metamask.app.link/wc?uri=${encodedUri}`;
    },
    getCreateConnectorFn() {
      return metaMaskSDk({
        useDeeplink: false,
        openDeeplink(arg) {
          openLink(arg);
        },
        ...connectorOptions,
      });
    },
    ...restProps,
  };
}
