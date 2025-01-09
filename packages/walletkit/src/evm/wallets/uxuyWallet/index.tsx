import { uxuyWalletConfig } from '@/core/configs/uyuxWallet';
import { injected } from '../injected';
import { EvmWallet, InjectedEvmWalletOptions } from '../types';

export function uxuyWallet(props: InjectedEvmWalletOptions = {}): EvmWallet {
  const { connectorOptions, ...restProps } = props;

  const getProvider = async () => {
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
  };

  return {
    ...uxuyWalletConfig,
    id: 'uxuyWallet',
    walletType: 'evm',
    behaviors: [
      {
        platforms: ['tg-android', 'tg-ios', 'tg-pc'],
        connectType: 'default',
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
      },
    ],
    ...restProps,
  };
}
