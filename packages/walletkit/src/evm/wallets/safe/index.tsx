import { safeConfig } from '@/core/configs/safe';
import { SafeParameters, safe as wagmiSafe } from 'wagmi/connectors';
import { EvmWallet } from '../types';

interface SafeOptions extends Partial<EvmWallet> {
  connectorOptions?: SafeParameters;
}

export function safe(props: SafeOptions = {}): EvmWallet {
  const { connectorOptions, ...restProps } = props;

  return {
    ...safeConfig,
    id: 'safe',
    walletType: 'evm',
    behaviors: [
      {
        platforms: [
          'tg-android',
          'tg-ios',
          'tg-pc',
          'browser-android',
          'browser-ios',
          'browser-pc',
        ],
        connectType: 'default',
        isInstalled() {
          return !(typeof window === 'undefined') && window?.parent !== window;
        },
        getCreateConnectorFn() {
          return wagmiSafe({
            allowedDomains: [/gnosis-safe.io$/, /app.safe.global$/],
            debug: false,
            ...connectorOptions,
          });
        },
      },
    ],
    ...restProps,
  };
}
