import { useMemo } from 'react';
import { BaseWallet } from '../configs/types';
import { useWalletKit } from '../providers/WalletKitProvider/context';

export function useWalletDownloadUrl(urls: BaseWallet['downloadUrls']) {
  const { options } = useWalletKit();

  const url = useMemo(() => {
    const url = urls.default ?? options.walletDownloadUrl;
    return url as string;
  }, [options.walletDownloadUrl, urls.default]);

  return url;
}
