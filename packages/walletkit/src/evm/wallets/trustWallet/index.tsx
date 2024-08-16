import { sleep } from '@/core/utils/common';
import { trustWalletConfig } from '@/core/configs/trustWallet';
import { injected } from '../injected';
import { EvmWallet, InjectedEvmWalletOptions } from '../types';
import { getInjectedEvmProvider, hasInjectedEvmProvider } from '../utils';

export function trustWallet(props: InjectedEvmWalletOptions = {}): EvmWallet {
  const { connectorOptions, ...restProps } = props;

  return {
    ...trustWalletConfig,
    id: 'trust',
    walletType: 'evm',
    showQRCode: false,
    isInstalled: () => {
      if (typeof window === 'undefined') return false;

      return (
        hasInjectedEvmProvider('isTrust') ||
        window?.trustwallet?.isTrust ||
        window?.trustWallet?.isTrust
      );
    },
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
          id: trustWallet().id,
          name: trustWallet().name,
          async setup() {
            if (typeof window === 'undefined') return;
            await sleep();
          },
          async provider() {
            const provider =
              getInjectedEvmProvider('isTrust') ?? window.trustwallet ?? window.trustWallet;
            return provider;
          },
        },
        ...connectorOptions,
      });
    },
    ...restProps,
  };
}
