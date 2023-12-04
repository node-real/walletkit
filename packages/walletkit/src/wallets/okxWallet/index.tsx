import { Chain } from 'wagmi';
import { PartialCustomProps, WalletProps } from '..';
import { CustomConnector } from '../custom/connector';
import { getInjectedProvider, hasInjectedProvider } from '../utils';
import { OkxWalletIcon, OkxWalletTransparentIcon } from './icon';
import { isMobile } from '@/index';

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
    isInstalled: isOkxWallet,
    createConnector: (chains: Chain[]) => {
      return new CustomConnector({
        id: OKX_WALLET_ID,
        chains,
        options: {
          name: 'OKX Wallet',
          shimDisconnect: true,
          getProvider() {
            if (typeof window === 'undefined') return;

            if (isMobile()) {
              return window.ethereum || window.okexchain;
            }

            return getInjectedProvider('isOkxWallet') ?? window.okexchain;
          },
          ...connectorOptions,
        },
      });
    },
    getDeepLink: () => {
      return `okx://wallet/dapp/details?dappUrl=${window.location.href}`;
    },
    getQRCodeUri(uri) {
      return `okex://main/wc?uri=${encodeURIComponent(uri)}`;
    },
    ...restProps,
  };
}

export function isOkxWallet() {
  if (typeof window === 'undefined') return false;

  if (isMobile()) {
    return !!(window.ethereum || window.okexchain);
  }

  return hasInjectedProvider('isOkxWallet') || window.okexchain?.isOkxWallet;
}
