import { useDataSource, WalletConfig } from '@/components/DataSourceProvider/context';
import { useMemo } from 'react';

type DownloadUrlsType = WalletConfig['downloadUrls'];

export function useWalletDownloadUrl(urls: DownloadUrlsType) {
  const { options } = useDataSource();

  const url = useMemo(() => {
    const url = urls.default ?? options.walletDownloadUrl;
    return url as string;
  }, [options.walletDownloadUrl, urls.default]);

  return url;
}
