import { WalletKitOptions } from '@/core/components/WalletKitProvider/context';
import { DEFAULT_OPTIONS } from '@/ui/constants';

export function getDefaultWalletKitOptions(options: WalletKitOptions) {
  const { ...restOptions } = options;

  const mergedOptions: WalletKitOptions = {
    ...DEFAULT_OPTIONS,
    ...restOptions,
  };

  return mergedOptions;
}