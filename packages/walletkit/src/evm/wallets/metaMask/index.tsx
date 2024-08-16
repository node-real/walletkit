import { metaMaskConfig } from '@/core/configs/metaMask';
import { hasInjectedEvmProvider } from '../utils';
import { injected } from '../injected';
import { InjectedEvmWalletOptions, EvmWallet } from '../types';

export function metaMask(props: InjectedEvmWalletOptions = {}): EvmWallet {
  const { connectorOptions, ...restProps } = props;

  return {
    ...metaMaskConfig,
    id: 'metaMask',
    walletType: 'evm',
    showQRCode: false,
    isInstalled: () => {
      return hasInjectedEvmProvider('isMetaMask');
    },
    getDeepLink: () => {
      const dappPath = window.location.href.replace(/^https?:\/\//, '');
      return `dapp://${dappPath}`;
    },
    getQRCodeUri: (uri) => {
      return `metamask://wc?uri=${encodeURIComponent(uri)}`;
    },
    getCreateConnectorFn: () => {
      return injected({
        shimDisconnect: true,
        target: 'metaMask',
        ...connectorOptions,
      });
    },
    ...restProps,
  };
}
