import { SolanaWallet } from '../types';
import { binanceWalletConfig } from '@/core/configs/binanceWallet';
import { isBinanceInstalled, getBinanceAppLink } from '@/core/utils/binance';

type BinanceWalletOptions = Partial<SolanaWallet>

export function binanceWallet(props: BinanceWalletOptions = {}): SolanaWallet {
  const { ...restProps } = props;

  return {
    ...binanceWalletConfig,
    id: 'solana:binanceWallet',
    walletType: 'solana',
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
      },
    ],
    ...restProps,
  };
}
