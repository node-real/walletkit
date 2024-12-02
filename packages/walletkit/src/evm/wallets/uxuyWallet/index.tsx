import { uxuyWalletConfig } from '@/core/configs/uyuxWallet';
import { injected } from '../injected';
import { EvmWallet, InjectedEvmWalletOptions } from '../types';

export function uxuyWallet(props: InjectedEvmWalletOptions = {}): EvmWallet {
  const { connectorOptions, ...restProps } = props;

  return {
    ...uxuyWalletConfig,
    id: 'uxuyWallet',
    walletType: 'evm',
    showQRCode: false,
    platforms: ['tg-android', 'tg-ios', 'tg-pc'],
    isInstalled() {
      return true;
    },
    getDeepLink() {
      return undefined;
    },
    getUri(uri) {
      return undefined;
    },
    getCreateConnectorFn() {
      return injected({
        shimDisconnect: true,
        target: {
          id: uxuyWallet().id,
          name: uxuyWallet().name,
          async provider() {
            return await getProvider();
          },
        },
        ...connectorOptions,
      });
    },
    ...restProps,
  };
}

async function getProvider() {
  if (typeof window === 'undefined') return;

  try {
    const { WalletTgSdk } = (await import('@uxuycom/web3-tg-sdk')).default;
    const { ethereum } = new WalletTgSdk({
      metaData: {
        hostname: window.location.hostname,
      },
    });

    return ethereum as any;
  } catch (err) {
    console.error(err);
  }
}
