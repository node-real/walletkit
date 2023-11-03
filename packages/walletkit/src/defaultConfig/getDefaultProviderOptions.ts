import { Chain } from 'wagmi';
import { WalletKitOptions } from '../components/WalletKitProvider/context';
import { toast } from '../base/toast';

export function getDefaultProviderOptions(options: WalletKitOptions, chains: Chain[]) {
  const { ...restOptions } = options;

  const mergedOptions: WalletKitOptions = {
    initialChainId: chains?.[0]?.id,
    hideNoWalletCTA: false,
    hideOfficialWalletConnectCTA: false,
    walletDownloadUrl: `https://trustwallet.com/`,
    onError,
    ...restOptions,
  };

  return mergedOptions;
}

function onError(_: any, description: string) {
  if (description) {
    toast.error({
      description,
    });
  }
}
