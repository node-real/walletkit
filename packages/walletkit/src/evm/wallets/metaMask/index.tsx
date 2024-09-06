import { metaMaskConfig } from '@/core/configs/metaMask';
import { hasEvmInjectedProvider } from '../utils';
import { injected } from '../injected';
import { InjectedEvmWalletOptions, EvmWallet } from '../types';
import { isAndroid, isTMA } from '@/core/base/utils/mobile';

export function metaMask(props: InjectedEvmWalletOptions = {}): EvmWallet {
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
      let encodedUri = encodeURIComponent(uri);
      if (isTMA() && isAndroid()) {
        encodedUri = encodeURIComponent(encodedUri);
      }
      return `https://metamask.app.link/wc?uri=${encodedUri}`;
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
