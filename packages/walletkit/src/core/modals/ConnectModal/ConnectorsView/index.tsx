import { Box } from '@/core/base/components/Box';
import { ModalHeader } from '@/core/base/components/Modal/ModalHeader';
import { useResponsive } from '@/core/base/hooks/useResponsive';
import { cx } from '@/core/base/utils/css';
import { GridLayout } from './GridLayout';
import { ListLayout } from './ListLayout';
import { clsDisclaimer } from './styles.css';
import { useAppearance, useWalletKit } from '@/core/providers/WalletKitProvider/context';

export function ConnectorsView() {
  const appearance = useAppearance();
  const { wallets } = useWalletKit();
  const { isMobileLayout } = useResponsive();

  const visibleWallets = wallets.filter((item) => item.isVisible !== false);
  const useGridLayout =
    visibleWallets.length >= appearance.gridLayoutThreshold! ||
    (isMobileLayout && appearance.useGridLayoutOnMobile);

  return (
    <>
      <ModalHeader>{appearance.title}</ModalHeader>

      {appearance.disclaimer && (
        <Box className={cx('wk-disclaimer', clsDisclaimer)}>{appearance.disclaimer}</Box>
      )}

      {useGridLayout ? (
        <GridLayout visibleWallets={visibleWallets} />
      ) : (
        <ListLayout visibleWallets={visibleWallets} />
      )}
    </>
  );
}
