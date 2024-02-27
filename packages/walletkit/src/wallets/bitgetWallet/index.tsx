import { Chain } from 'wagmi';
import { PartialCustomProps, WalletProps } from '..';
import { CustomConnector } from '../custom/connector';
import { getInjectedProvider, hasInjectedProvider } from '../utils';
import { BitgetWalletIcon, BitgetWalletTransparentIcon } from './icon';
import { isMobile } from '@/index';

export const BITGET_WALLET_ID = 'bitgetWallet';
export const BITGET_WALLET_NAME = 'Bitget Wallet';

export function bitgetWallet(props: PartialCustomProps = {}): WalletProps {
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
    isInstalled: isBitgetWallet,
    createConnector: (chains: Chain[]) => {
      return new CustomConnector({
        id: BITGET_WALLET_ID,
        chains,
        options: {
          name: BITGET_WALLET_NAME,
          shimDisconnect: true,
          getProvider() {
            if (typeof window === 'undefined') return;

            if (isMobile()) {
              return window.ethereum || window.bitkeep?.ethereum;
            }

            return getInjectedProvider('isBitgetWallet' as any) ?? window.bitkeep?.ethereum;
          },
          ...connectorOptions,
        },
      });
    },
    getDeepLink: () => {
      return `https://bkcode.vip?action=dapp&url=${window.location.href}`;
    },
    getQRCodeUri(uri) {
      return `bitkeep://bkconnect/wc?uri=${encodeURIComponent(uri)}`;
    },
    ...restProps,
  };
}

export function isBitgetWallet() {
  if (typeof window === 'undefined') return false;

  if (isMobile()) {
    return !!(window.ethereum || window.bitkeep);
  }

  return hasInjectedProvider('isBitgetWallet' as any) || window.bitkeep;
}
