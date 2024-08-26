import { useMemo } from 'react';
import { BaseWallet } from '../configs/types';
import { useAppearance } from '../providers/WalletKitProvider/context';

export function useWalletDownloadUrl(urls: BaseWallet['downloadUrls']) {
  const appearance = useAppearance();

  const url = useMemo(() => {
    const url = urls.default ?? appearance.walletDownloadUrl;
    return url as string;
  }, [appearance.walletDownloadUrl, urls.default]);

  return url;
}
