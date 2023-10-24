import { Chain } from 'wagmi';
import { WalletKitOptions } from '../components/WalletKitProvider/context';

export function getDefaultProviderOptions(options: WalletKitOptions, chains: Chain[]) {
  const { ...restOptions } = options;

  const mergedOptions: WalletKitOptions = {
    initialChainId: chains?.[0]?.id,
    hideNoWalletCTA: false,
    walletDownloadUrl: `https://trustwallet.com/`,
    ...restOptions,
  };

  return mergedOptions;
}
