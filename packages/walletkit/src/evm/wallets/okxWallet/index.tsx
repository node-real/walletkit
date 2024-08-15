import { isMobile } from '@/core/base/utils/mobile';
import { okxWalletConfig } from '@/core/configs/okxWallet';
import { injected } from '../injected';
import { EvmWallet, InjectedEvmWalletOptions } from '../types';
import { getInjectedEvmProvider, hasInjectedEvmProvider } from '../utils';

export function okxWallet(props: InjectedEvmWalletOptions = {}): EvmWallet {
  const { connectorOptions, ...restProps } = props;

  return {
    ...okxWalletConfig,
    id: 'okxWallet',
    walletType: 'evm',
    showQRCode: false,
    isInstalled: () => {
      if (typeof window === 'undefined') return false;

      if (isMobile()) {
        return !!(window.ethereum || window.okexchain);
      }

      return hasInjectedEvmProvider('isOkxWallet') || window.okexchain?.isOkxWallet;
    },
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
          id: okxWallet().id,
          name: okxWallet().name,
          async provider() {
            if (isMobile()) {
              return window.ethereum || window.okexchain;
            }
            return getInjectedEvmProvider('isOkxWallet') ?? window.okexchain;
          },
        },
        ...connectorOptions,
      });
    },
    ...restProps,
  };
}
