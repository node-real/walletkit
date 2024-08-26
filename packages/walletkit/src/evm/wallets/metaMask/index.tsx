import { metaMaskConfig } from '@/core/configs/metaMask';
import { hasEvmInjectedProvider } from '../utils';
import { injected } from '../injected';
import { InjectedEvmWalletOptions, EvmWallet } from '../types';

export function metaMask(props: InjectedEvmWalletOptions = {}): EvmWallet {
  const { connectorOptions, ...restProps } = props;

  return {
    ...metaMaskConfig,
    id: 'metaMask',
    walletType: 'evm',
    showQRCode: false,
    useWalletConnect: false,
    isInstalled() {
      return hasEvmInjectedProvider('isMetaMask');
    },
    getDeepLink() {
      const dappPath = window.location.href.replace(/^https?:\/\//, '');
      return `dapp://${dappPath}`;
    },
    getUri(uri) {
      return `metamask://wc?uri=${encodeURIComponent(uri)}`;
    },
    getCreateConnectorFn() {
      return injected({
        shimDisconnect: true,
        target: 'metaMask',
        ...connectorOptions,
      });
    },
    ...restProps,
  };
}
