import { Chain } from 'wagmi';

import { TrustWalletIcon } from './icon';
import { PartialWalletProps, WalletProps } from '../types';
import { TrustWalletConnector, TrustWalletConnectorOptions } from '../trustWallet/connector';
import { Connector } from 'wagmi/connectors';

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
      default: <TrustWalletIcon />,
    },
    downloadUrls: {
      default: 'https://trustwallet.com/',
    },
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
  const { ethereum } = window;

  return !!(
    ethereum?.isTrust ||
    (ethereum?.providers && ethereum?.providers.find((provider: any) => provider.isTrust)) ||
    window?.trustwallet?.isTrust ||
    window?.trustWallet?.isTrust
  );
}

export function isTrustWalletConnector(connector?: Connector) {
  return connector?.id === TRUST_WALLET_ID;
}
