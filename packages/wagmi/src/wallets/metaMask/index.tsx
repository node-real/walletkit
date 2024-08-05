import { Connector } from 'wagmi';
import { InjectedWalletOptions, WalletProps } from '..';
import { hasInjectedProvider } from '../utils';
import { injected } from '../injected';
import { MetaMaskIcon, MetaMaskTransparentIcon } from '@/ui/index';

const META_MASK_ID = 'metaMask';
const META_MASK_NAME = 'MetaMask';

export function metaMask(props: InjectedWalletOptions = {}): WalletProps {
  const { connectorOptions, ...restProps } = props;

  return {
    id: META_MASK_ID,
    name: META_MASK_NAME,
    logos: {
      default: <MetaMaskIcon />,
      transparent: <MetaMaskTransparentIcon />,
    },
    downloadUrls: {
      default: 'https://metamask.io/download/',
    },
    spinnerColor: '#F0B90B',
    showQRCode: false,
    isInstalled: haInjectedMetaMask,
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

export function haInjectedMetaMask() {
  return hasInjectedProvider('isMetaMask');
}

export function isMetaMaskConnector(connector?: Connector) {
  return connector?.id === META_MASK_ID;
}
