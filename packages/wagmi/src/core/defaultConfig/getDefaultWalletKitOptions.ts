import { DEFAULT_OPTIONS } from '@/ui/constants';
import { WalletKitOptions } from '../components/WalletKitProvider/context';

export function getDefaultWalletKitOptions(options: WalletKitOptions) {
  const { ...restOptions } = options;

  const mergedOptions: WalletKitOptions = {
    initialChainId: undefined,
    chainsConfig: undefined,
    ...DEFAULT_OPTIONS,
    ...restOptions,
  };

  return mergedOptions;
}
