import { SafeParameters, safe as wagmiSafe } from 'wagmi/connectors';
import { WalletProps } from '../types';
import { SafeIcon } from '@/ui/index';

const SAFE_ID = 'safe';
const SAFE_NAME = 'Safe Wallet';

export interface SafeOptions extends Partial<WalletProps> {
  connectorOptions?: SafeParameters;
}

export function safe(props: SafeOptions = {}): WalletProps {
  const { connectorOptions, ...restProps } = props;

  return {
    id: SAFE_ID,
    name: SAFE_NAME,
    logos: {
      default: <SafeIcon />,
    },
    downloadUrls: {
      default: undefined,
    },
    showQRCode: false,
    isInstalled: hasInjectedSafe,
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

export function hasInjectedSafe() {
  return !(typeof window === 'undefined') && window?.parent !== window;
}
