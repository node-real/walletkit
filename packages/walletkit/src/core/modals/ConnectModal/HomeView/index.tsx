import { Box } from '@/core/base/components/Box';
import { ModalHeader } from '@/core/base/components/Modal/ModalHeader';
import { useResponsive } from '@/core/base/hooks/useResponsive';
import { cx } from '@/core/base/utils/css';
import { GridLayout } from './GridLayout';
import { ListLayout } from './ListLayout';
import { clsDisclaimer } from './styles.css';
import { useWalletKit } from '@/core/providers/WalletKitProvider/context';
import { isAndroid, isBrowser, isIOS, isPC, isTMA } from '@/core/base/utils/mobile';
import { useMemo } from 'react';

export function HomeView() {
  const { wallets, options } = useWalletKit();
  const { isMobileLayout } = useResponsive();

  const visibleWallets = useMemo(() => {
    const visibleWallets = wallets.filter((wallet) => {
      const isVisible =
        wallet.isVisible !== false &&
        ((isBrowser() && isAndroid() && wallet.platforms.includes('browser-android')) ||
          (isBrowser() && isIOS() && wallet.platforms.includes('browser-ios')) ||
          (isBrowser() && isPC() && wallet.platforms.includes('browser-pc')) ||
          (isTMA() && isAndroid() && wallet.platforms.includes('tg-android')) ||
          (isTMA() && isIOS() && wallet.platforms.includes('tg-ios')) ||
          (isTMA() && isPC() && wallet.platforms.includes('tg-pc')));
      return isVisible;
    });

    return visibleWallets;
  }, [wallets]);

  const useGridLayout =
    visibleWallets.length >= options.gridLayoutThreshold! ||
    (isMobileLayout && options.useGridLayoutOnMobile);

  return (
    <>
      <ModalHeader>{options.title}</ModalHeader>

      {options.disclaimer && (
        <Box className={cx('wk-disclaimer', clsDisclaimer)}>{options.disclaimer}</Box>
      )}

      {useGridLayout ? (
        <GridLayout visibleWallets={visibleWallets} />
      ) : (
        <ListLayout visibleWallets={visibleWallets} />
      )}
    </>
  );
}
