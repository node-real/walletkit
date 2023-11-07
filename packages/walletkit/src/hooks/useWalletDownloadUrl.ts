import { useMemo } from 'react';
import { WalletProps } from '../wallets';
import { useWalletKitContext } from '..';

type DownloadUrlsType = WalletProps['downloadUrls'];

export function useWalletDownloadUrl(urls: DownloadUrlsType) {
  const { options } = useWalletKitContext();

  const url = useMemo(() => {
    const url = urls.default ?? options.walletDownloadUrl;
    return url as string;
  }, [options.walletDownloadUrl, urls.default]);

  return url;
}
