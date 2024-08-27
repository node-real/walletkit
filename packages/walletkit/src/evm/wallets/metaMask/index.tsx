import { metaMaskConfig } from '@/core/configs/metaMask';
import { hasEvmInjectedProvider } from '../utils';
import { injected } from '../injected';
import { InjectedEvmWalletOptions, EvmWallet } from '../types';
import { isMobile, isTMA } from '@/core/index';

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
      const wcUri = `wc?uri=${encodeURIComponent(uri)}`;

      if (isTMA() && isMobile()) {
        return `https://metamask.app.link/${wcUri}`;
      }

      return `metamask://${wcUri}`;
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
