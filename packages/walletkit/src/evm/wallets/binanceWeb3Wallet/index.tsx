import { binanceWeb3WalletConfig } from '@/core/configs/binanceWeb3Wallet';
import { EvmWallet } from '../types';
import { BinanceW3WParameters, getWagmiConnectorV2 } from '@binance/w3w-wagmi-connector-v2';

export interface BinanceWeb3WalletOptions extends Partial<EvmWallet> {
  connectorOptions?: BinanceW3WParameters;
}

export function binanceWeb3Wallet(props: BinanceWeb3WalletOptions = {}): EvmWallet {
  const { connectorOptions, ...restProps } = props;

  return {
    ...binanceWeb3WalletConfig,
    id: 'binanceWeb3Wallet',
    walletType: 'evm',
    showQRCode: false,
    platforms: ['tg-android', 'tg-ios', 'tg-pc', 'browser-android', 'browser-ios', 'browser-pc'],
    isInstalled() {
      return true;
    },
    getDeepLink() {
      return undefined;
    },
    getUri() {
      return undefined;
    },
    getCreateConnectorFn() {
      const connector = getWagmiConnectorV2();
      return connector({
        ...connectorOptions,
      }) as any;
    },
    ...restProps,
  };
}
