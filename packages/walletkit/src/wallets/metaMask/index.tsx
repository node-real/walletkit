import { Chain, Connector } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { PartialWalletProps, WalletProps, isTokenPocket } from '..';
import { MetaMaskIcon, MetaMaskTransparentIcon } from './icon';

export const META_MASK_ID = 'metaMask';

export type MetaMaskConnectorOptions = Required<
  ConstructorParameters<typeof MetaMaskConnector>
>[0]['options'];

export interface MetaMaskProps extends PartialWalletProps {
  connectorOptions?: MetaMaskConnectorOptions;
}

export function metaMask(props: MetaMaskProps = {}): WalletProps {
  const { connectorOptions, ...restProps } = props;

  return {
    id: META_MASK_ID,
    name: 'MetaMask',
    logos: {
      default: <MetaMaskIcon />,
      transparent: <MetaMaskTransparentIcon />,
    },
    downloadUrls: {
      default: 'https://metamask.io/download/',
    },
    spinnerColor: '#F0B90B',
    showQRCode: false,
    installed: isMetaMask(),
    createConnector: (chains: Chain[]) => {
      return new MetaMaskConnector({
        chains,
        options: {
          shimDisconnect: true,
          UNSTABLE_shimOnConnectSelectAccount: false,
          ...connectorOptions,
        },
      });
    },
    getDeepLink: () => {
      const dappPath = window.location.href.replace(/^https?:\/\//, '');
      return `dapp://${dappPath}`;
    },
    getQRCodeUri(uri) {
      return `metamask://wc?uri=${encodeURIComponent(uri)}`;
    },
    ...restProps,
  };
}

export function isMetaMask() {
  if (typeof window === 'undefined') return false;

  if (isTokenPocket()) return false;

  return window?.ethereum?.isMetaMask;
}

export function isMetaMaskConnector(connector?: Connector) {
  return connector?.id === META_MASK_ID;
}
