import { BinanceWalletAdapter } from '@tronweb3/tronwallet-adapter-binance';
import { TronWallet } from '../types';
import { binanceWalletConfig } from '@/core/configs/binanceWallet';
import { isBinanceInstalled, getBinanceAppLink } from '@/core/utils/binance';

interface BinanceWalletOptions extends Partial<TronWallet> {
  adapterOptions?: ConstructorParameters<typeof BinanceWalletAdapter>[0];
}

export function binanceWallet(props: BinanceWalletOptions = {}): TronWallet {
  const { adapterOptions, ...restProps } = props;

  return {
    ...binanceWalletConfig,
    id: 'tron:binanceWallet',
    walletType: 'tron',
    adapterName: 'Binance Wallet',
    behaviors: [
      {
        platforms: ['browser-android', 'browser-ios', 'browser-pc'],
        connectType: 'default',
        isInstalled() {
          return isBinanceInstalled();
        },
        getAppLink() {
          return getBinanceAppLink();
        },
        getAdapter() {
          return new BinanceWalletAdapter(adapterOptions);
        },
      },
    ],
    ...restProps,
  };
}
