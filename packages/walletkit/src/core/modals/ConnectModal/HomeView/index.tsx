import { Box } from '@/core/base/components/Box';
import { ModalHeader } from '@/core/base/components/Modal/ModalHeader';
import { useResponsive } from '@/core/base/hooks/useResponsive';
import { cx } from '@/core/base/utils/css';
import { GridLayout } from './GridLayout';
import { ListLayout } from './ListLayout';
import { clsDisclaimer } from './styles.css';
import { useWalletKit } from '@/core/providers/WalletKitProvider/context';
import { useMemo } from 'react';
import { getPlatform } from '@/core/utils/common';

export function HomeView() {
  const { wallets, options } = useWalletKit();
  const { isMobileLayout } = useResponsive();

  const visibleWallets = useMemo(() => {
    const platform = getPlatform();
    const visibleWallets = wallets.filter((wallet) => {
      const isVisible =
        wallet.isVisible !== false &&
        !!wallet.behaviors.find((e) => e.platforms.includes(platform));
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
