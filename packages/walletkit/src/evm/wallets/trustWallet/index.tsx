import { sleep } from '@/core/utils/common';
import { trustWalletConfig } from '@/core/configs/trustWallet';
import { injected } from '../injected';
import { EvmWallet, InjectedEvmWalletOptions } from '../types';
import { getEvmInjectedProvider } from '../utils';
import { isMobile, isTMA } from '@/core/index';

export function trustWallet(props: InjectedEvmWalletOptions = {}): EvmWallet {
  const { connectorOptions, ...restProps } = props;

  return {
    ...trustWalletConfig,
    id: 'trust',
    walletType: 'evm',
    showQRCode: false,
    useWalletConnect: false,
    isInstalled() {
      return !!getProvider();
    },
    getDeepLink() {
      const dappPath = `https://link.trustwallet.com/open_url?coin_id=60&url=${encodeURIComponent(
        window.location.href,
      )}`;
      return dappPath;
    },
    getUri(uri) {
      const wcUri = `wc?uri=${encodeURIComponent(uri)}`;

      if (isTMA() && isMobile()) {
        return `https://link.trustwallet.com/${wcUri}`;
      }

      return `trust://${wcUri}`;
    },
    getCreateConnectorFn() {
      return injected({
        shimDisconnect: true,
        target: {
          id: trustWallet().id,
          name: trustWallet().name,
          async setup() {
            if (typeof window === 'undefined') return;
            await sleep();
          },
          async provider() {
            return getProvider();
          },
        },
        ...connectorOptions,
      });
    },
    ...restProps,
  };
}

function getProvider() {
  if (typeof window === 'undefined') return;
  return getEvmInjectedProvider('isTrust') ?? window.trustwallet ?? window.trustWallet;
}
