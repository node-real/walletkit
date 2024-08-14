import { safeConfig } from '@/core/configs/wallets/safe';
import { SafeParameters, safe as wagmiSafe } from 'wagmi/connectors';
import { EvmWallet } from '../types';

interface SafeOptions extends Partial<EvmWallet> {
  connectorOptions?: SafeParameters;
}

export function safe(props: SafeOptions = {}): EvmWallet {
  const { connectorOptions, ...restProps } = props;

  return {
    ...safeConfig,
    showQRCode: false,
    isInstalled: () => {
      return !(typeof window === 'undefined') && window?.parent !== window;
    },
    getDeepLink: () => {
      return undefined;
    },
    getCreateConnectorFn: () => {
      return wagmiSafe({
        allowedDomains: [/gnosis-safe.io$/, /app.safe.global$/],
        debug: false,
        ...connectorOptions,
      });
    },
    ...restProps,
  };
}
