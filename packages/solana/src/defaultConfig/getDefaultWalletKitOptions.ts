import { WalletKitOptions } from '@/components/WalletKitProvider/context';
import { DEFAULT_OPTIONS } from '@node-real/walletkit-ui';

export function getDefaultWalletKitOptions(options: WalletKitOptions) {
  const { ...restOptions } = options;

  const mergedOptions: WalletKitOptions = {
    ...DEFAULT_OPTIONS,
    ...restOptions,
  };

  return mergedOptions;
}
