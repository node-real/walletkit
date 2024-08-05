import { injected } from '../injected';
import { getInjectedProvider, hasInjectedProvider } from '../utils';
import { InjectedWalletOptions, WalletProps } from '../types';
import { isMobile, OkxWalletIcon, OkxWalletTransparentIcon } from '@/ui/index';

const OKX_WALLET_ID = 'okxWallet';
const OKX_WALLET_NAME = 'OKX Wallet';

export function okxWallet(props: InjectedWalletOptions = {}): WalletProps {
  const { connectorOptions, ...restProps } = props;

  return {
    id: OKX_WALLET_ID,
    name: OKX_WALLET_NAME,
    logos: {
      default: <OkxWalletIcon />,
      transparent: <OkxWalletTransparentIcon />,
    },
    downloadUrls: {
      default: 'https://www.okx.com/web3',
    },
    spinnerColor: undefined,
    showQRCode: false,
    isInstalled: hasInjectedOkxWallet,
    getDeepLink: () => {
      return `okx://wallet/dapp/details?dappUrl=${window.location.href}`;
    },
    getQRCodeUri: (uri) => {
      return `okex://main/wc?uri=${encodeURIComponent(uri)}`;
    },
    getCreateConnectorFn: () => {
      return injected({
        shimDisconnect: true,
        target: {
          id: OKX_WALLET_ID,
          name: OKX_WALLET_NAME,
          async provider() {
            if (isMobile()) {
              return window.ethereum || window.okexchain;
            }
            return getInjectedProvider('isOkxWallet') ?? window.okexchain;
          },
        },
        ...connectorOptions,
      });
    },
    ...restProps,
  };
}

export function hasInjectedOkxWallet() {
  if (typeof window === 'undefined') return false;

  if (isMobile()) {
    return !!(window.ethereum || window.okexchain);
  }

  return hasInjectedProvider('isOkxWallet') || window.okexchain?.isOkxWallet;
}
