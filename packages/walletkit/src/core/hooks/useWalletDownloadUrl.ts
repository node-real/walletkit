import { useMemo } from 'react';
import { BaseWallet } from '../configs/wallets/types';
import { useConfig } from '../providers/WalletKitProvider/context';

type DownloadUrlsType = BaseWallet['downloadUrls'];

export function useWalletDownloadUrl(urls: DownloadUrlsType) {
  const { appearance } = useConfig();

  const url = useMemo(() => {
    const url = urls.default ?? appearance.walletDownloadUrl;
    return url as string;
  }, [appearance.walletDownloadUrl, urls.default]);

  return url;
}
