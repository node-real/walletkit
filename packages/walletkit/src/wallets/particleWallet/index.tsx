import { Chain } from 'wagmi';
import { PartialWalletProps, WalletProps } from '..';
import { ParticleWalletIcon, ParticleWalletTransparentIcon } from './icon';
import { ParticleConnector, ParticleConnectorOptions } from './connector';

export const PARTICLE_WALLET_ID = 'particleWallet';

export interface ParticleWalletProps extends PartialWalletProps {
  connectorOptions?: ParticleConnectorOptions;
}

export function particleWallet(props: ParticleWalletProps = {}): WalletProps {
  const { connectorOptions, ...restProps } = props;

  return {
    id: PARTICLE_WALLET_ID,
    name: 'Particle',
    logos: {
      default: <ParticleWalletIcon />,
      transparent: <ParticleWalletTransparentIcon />,
    },
    downloadUrls: {
      default: 'https://particle.network/',
    },
    spinnerColor: undefined,
    showQRCode: false,
    isInstalled: isParticleWallet,
    createConnector: (chains: Chain[]) => {
      return new ParticleConnector({
        chains,
        options: {
          shimDisconnect: true,
          auth: typeof window === 'undefined' ? undefined : window.particle?.auth,
          ...connectorOptions,
        },
      });
    },
    getDeepLink: () => {
      return undefined;
    },
    getQRCodeUri(uri) {
      return uri;
    },
    ...restProps,
  };
}

export function isParticleWallet() {
  if (typeof window === 'undefined') return false;

  return !!window.particle;
}
