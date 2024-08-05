import { InjectedWalletOptions, WalletProps } from '..';
import { getInjectedProvider, hasInjectedProvider } from '../utils';
import { injected } from '../injected';
import { BitgetWalletIcon, BitgetWalletTransparentIcon, isMobile } from '@/ui/index';

const BITGET_WALLET_ID = 'bitgetWallet';
const BITGET_WALLET_NAME = 'Bitget Wallet';

export function bitgetWallet(props: InjectedWalletOptions = {}): WalletProps {
  const { connectorOptions, ...restProps } = props;

  return {
    id: BITGET_WALLET_ID,
    name: BITGET_WALLET_NAME,
    logos: {
      default: <BitgetWalletIcon />,
      transparent: <BitgetWalletTransparentIcon />,
    },
    downloadUrls: {
      default: 'https://web3.bitget.com/',
    },
    spinnerColor: undefined,
    showQRCode: false,
    isInstalled: hasInjectedBitgetWallet,
    getDeepLink: () => {
      return `https://bkcode.vip?action=dapp&url=${window.location.href}`;
    },
    getQRCodeUri: (uri) => {
      return `bitkeep://bkconnect/wc?uri=${encodeURIComponent(uri)}`;
    },
    getCreateConnectorFn: () => {
      return injected({
        shimDisconnect: true,
        target: {
          id: BITGET_WALLET_ID,
          name: BITGET_WALLET_NAME,
          async provider() {
            if (isMobile()) {
              return window.ethereum || window.bitkeep?.ethereum;
            }

            return getInjectedProvider('isBitgetWallet') ?? window.bitkeep?.ethereum;
          },
        },
        ...connectorOptions,
      });
    },
    ...restProps,
  };
}

export function hasInjectedBitgetWallet() {
  if (typeof window === 'undefined') return false;

  if (isMobile()) {
    return !!(window.ethereum || window.bitkeep);
  }

  return hasInjectedProvider('isBitgetWallet') || window.bitkeep;
}
