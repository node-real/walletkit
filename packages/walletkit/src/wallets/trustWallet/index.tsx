import { injected } from '../injected';
import { getInjectedProvider, hasInjectedProvider } from '../utils';
import {
  TrustWalletLightIcon,
  TrustWalletDarkIcon,
  TrustWalletTransparentLightIcon,
  TrustWalletTransparentDarkIcon,
} from './icon';
import { InjectedWalletOptions, WalletProps } from '../types';
import { Connector } from 'wagmi';
import { sleep } from '@/utils/common';

const TRUST_WALLET_ID = 'trust';
const TRUST_WALLET_NAME = 'Trust Wallet';

export function trustWallet(props: InjectedWalletOptions = {}): WalletProps {
  const { connectorOptions, ...restProps } = props;

  return {
    id: TRUST_WALLET_ID,
    name: TRUST_WALLET_NAME,
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
    showQRCode: false,
    isInstalled: hasInjectedTrustWallet,
    getDeepLink: () => {
      const dappPath = `https://link.trustwallet.com/open_url?coin_id=60&url=${encodeURIComponent(
        window.location.href,
      )}`;
      return dappPath;
    },
    getQRCodeUri: (uri) => {
      return `trust://wc?uri=${encodeURIComponent(uri)}`;
    },
    getCreateConnectorFn: () => {
      return injected({
        shimDisconnect: true,
        target: {
          id: TRUST_WALLET_ID,
          name: TRUST_WALLET_NAME,
          async setup() {
            await sleep();
          },
          async provider() {
            const provider =
              getInjectedProvider('isTrust') ?? window.trustwallet ?? window.trustWallet;
            return provider;
          },
        },
        ...connectorOptions,
      });
    },
    ...restProps,
  };
}

export function hasInjectedTrustWallet() {
  if (typeof window === 'undefined') return false;

  return (
    hasInjectedProvider('isTrust') || window?.trustwallet?.isTrust || window?.trustWallet?.isTrust
  );
}

export function isTrustWalletConnector(connector?: Connector) {
  return connector?.id === TRUST_WALLET_ID;
}
