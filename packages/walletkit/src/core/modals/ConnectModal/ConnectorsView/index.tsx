import { Box } from '@/core/base/components/Box';
import { ModalHeader } from '@/core/base/components/Modal/ModalHeader';
import { useResponsive } from '@/core/base/hooks/useResponsive';
import { cx } from '@/core/base/utils/css';
import { GridLayout } from './GridLayout';
import { ListLayout } from './ListLayout';
import { clsDisclaimer } from './styles.css';
import { useConfig } from '@/core/providers/WalletKitProvider/context';
import { useWallets } from '@/core/hooks/useWallets';

export function ConnectorsView() {
  const { appearance } = useConfig();
  const { wallets } = useWallets();

  const { isMobileLayout } = useResponsive();

  const useGridLayout =
    wallets.length >= appearance.gridLayoutThreshold! ||
    (isMobileLayout && appearance.useGridLayoutOnMobile);

  return (
    <>
      <ModalHeader>{appearance.title}</ModalHeader>

      {appearance.disclaimer && (
        <Box className={cx('wk-disclaimer', clsDisclaimer)}>{appearance.disclaimer}</Box>
      )}

      {useGridLayout ? <GridLayout wallets={wallets} /> : <ListLayout wallets={wallets} />}
    </>
  );
}
