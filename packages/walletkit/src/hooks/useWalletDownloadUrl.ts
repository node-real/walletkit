import { useWalletKit } from '@/components/WalletKitProvider/context';
import { WalletProps } from '@/wallets';
import { useMemo } from 'react';

type DownloadUrlsType = WalletProps['downloadUrls'];

export function useWalletDownloadUrl(urls: DownloadUrlsType) {
  const { options } = useWalletKit();

  const url = useMemo(() => {
    const url = urls.default ?? options.walletDownloadUrl;
    return url as string;
  }, [options.walletDownloadUrl, urls.default]);

  return url;
}
