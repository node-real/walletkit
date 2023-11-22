import { Chain } from 'wagmi';
import { PartialCustomProps, WalletProps } from '..';
import { CustomConnector } from '../custom/connector';
import { getInjectedProvider, hasInjectedProvider } from '../utils';
import { OkxWalletIcon, OkxWalletTransparentIcon } from './icon';

export const OKX_WALLET_ID = 'okxWallet';

export function okxWallet(props: PartialCustomProps = {}): WalletProps {
  const { connectorOptions, ...restProps } = props;

  return {
    id: OKX_WALLET_ID,
    name: 'OKX Wallet',
    logos: {
      default: <OkxWalletIcon />,
      transparent: <OkxWalletTransparentIcon />,
    },
    downloadUrls: {
      default: 'https://www.okx.com/web3',
    },
    spinnerColor: undefined,
    showQRCode: false,
    installed: isOkxWallet(),
    createConnector: (chains: Chain[]) => {
      return new CustomConnector({
        id: OKX_WALLET_ID,
        chains,
        options: {
          name: 'OKX Wallet',
          shimDisconnect: true,
          getProvider() {
            if (typeof window === 'undefined') return;

            const provider = getInjectedProvider('isOkxWallet') ?? window.okexchain;
            return provider;
          },
          ...connectorOptions,
        },
      });
    },
    getDeepLink: () => {
      return `okx://wallet/dapp/details?dappUrl=${window.location.href}`;
    },
    getQRCodeUri(uri) {
      return `okex://main/wc?uri=${decodeURIComponent(uri)}`;
    },
    ...restProps,
  };
}

export function isOkxWallet() {
  if (typeof window === 'undefined') return false;

  return !!(hasInjectedProvider('isOkxWallet') || window.okexchain?.isOkxWallet);
}
