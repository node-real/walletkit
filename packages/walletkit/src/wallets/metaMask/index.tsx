import { Connector } from 'wagmi';
import { WalletProps } from '..';
import { MetaMaskIcon, MetaMaskTransparentIcon } from './icon';
import { getInjectedProvider, hasInjectedProvider } from '../utils';
import { injected, MetaMaskParameters } from 'wagmi/connectors';

const META_MASK_ID = 'metaMask';
const META_MASK_NAME = 'MetaMask';

export interface MetaMaskOptions extends Partial<WalletProps> {
  connectorOptions?: MetaMaskParameters;
}

export function metaMask(props: MetaMaskOptions = {}): WalletProps {
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
        target() {
          return {
            id: META_MASK_ID,
            name: META_MASK_NAME,
            provider() {
              return getInjectedProvider('isMetaMask') ?? window.ethereum;
            },
          };
        },
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
