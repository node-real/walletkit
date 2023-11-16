import { Chain } from 'wagmi';

import {
  TrustWalletDarkIcon,
  TrustWalletLightIcon,
  TrustWalletMobileDarkIcon,
  TrustWalletMobileLightIcon,
} from './icon';
import { PartialWalletProps, WalletProps } from '../types';
import { TrustWalletConnector, TrustWalletConnectorOptions } from '../trustWallet/connector';
import { hasInjectedProvider } from '../utils';

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
      mobile: {
        light: <TrustWalletMobileLightIcon />,
        dark: <TrustWalletMobileDarkIcon />,
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
