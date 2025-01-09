import { TronLinkAdapter, TronLinkAdapterConfig } from '@tronweb3/tronwallet-adapter-tronlink';
import { TronWallet } from '../types';
import { tronLinkConfig } from '@/core/configs/tronLink';
import { hasTronInjectedProvider } from '../utils';

interface TronLinkOptions extends Partial<TronWallet> {
  adapterOptions?: Partial<TronLinkAdapterConfig>;
}

export function tronLink(props: TronLinkOptions = {}): TronWallet {
  const { adapterOptions, ...restProps } = props;

  return {
    ...tronLinkConfig,
    id: 'tron:tronLink',
    walletType: 'tron',
    adapterName: 'TronLink',
    behaviors: [
      {
        platforms: ['browser-android', 'browser-ios', 'browser-pc'],
        connectType: 'default',
        isInstalled() {
          return hasTronInjectedProvider('isTronLink');
        },
        getAdapter() {
          return new TronLinkAdapter({
            ...adapterOptions,
          });
        },
      },
    ],
    ...restProps,
  };
}
