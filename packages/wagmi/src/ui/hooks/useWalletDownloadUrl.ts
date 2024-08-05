import { useWalletKit } from '@/core/components/WalletKitProvider/context';
import { useMemo } from 'react';
import { WalletConfig } from '../types';

type DownloadUrlsType = WalletConfig['downloadUrls'];

export function useWalletDownloadUrl(urls: DownloadUrlsType) {
  const { options } = useWalletKit();

  const url = useMemo(() => {
    const url = urls.default ?? options.walletDownloadUrl;
    return url as string;
  }, [options.walletDownloadUrl, urls.default]);

  return url;
}
