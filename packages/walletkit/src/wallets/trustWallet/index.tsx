import { Chain } from 'wagmi';
import {
  PartialWalletProps,
  TrustWalletConnectorOptions,
  WalletProps,
  TrustWalletConnector,
} from '..';
import { hasInjectedProvider } from '../utils';
import {
  TrustWalletLightIcon,
  TrustWalletDarkIcon,
  TrustWalletTransparentLightIcon,
  TrustWalletTransparentDarkIcon,
} from './icon';

export const TRUST_WALLET_ID = 'trust';

export interface TrustWalletProps extends PartialWalletProps {
  connectorOptions?: TrustWalletConnectorOptions;
}

export function trustWallet(props: TrustWalletProps = {}): WalletProps {
  const { connectorOptions, ...restProps } = props;

  return {
    id: TRUST_WALLET_ID,
    name: 'Trust Wallet',
    logos: {
      default: {
        light: <TrustWalletLightIcon />,
        dark: <TrustWalletDarkIcon />,
      },
      transparent: {
        light: <TrustWalletTransparentLightIcon />,
        dark: <TrustWalletTransparentDarkIcon />,
      },
    },
    downloadUrls: {
      default: 'https://trustwallet.com/',
    },
    spinnerColor: '#1098FC',
    installed: isTrustWallet(),
    createConnector: (chains: Chain[]) => {
      return new TrustWalletConnector({
        chains,
        options: {
          shimDisconnect: true,
          ...connectorOptions,
        },
      });
    },
    getUri: () => {
      const dappPath = `https://link.trustwallet.com/open_url?coin_id=60&url=${encodeURIComponent(
        window.location.href,
      )}`;
      return dappPath;
    },
    ...restProps,
  };
}

export function isTrustWallet() {
  if (typeof window === 'undefined') return false;

  return !!(
    hasInjectedProvider('isTrust') ||
    window?.trustwallet?.isTrust ||
    window?.trustWallet?.isTrust
  );
}
