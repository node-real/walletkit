import { useWalletKit } from '@/core/components/WalletKitProvider/context';
import { GridLayout } from './GridLayout';
import { ListLayout } from './ListLayout';
import { clsDisclaimer } from './styles.css';
import { ModalHeader } from '@/ui/base/components/Modal/ModalHeader';
import { Box } from '@/ui/base/components/Box';
import { cx } from '@/ui/base/utils/css';
import { useResponsive } from '@/ui/base/hooks/useResponsive';

export function Connectors() {
  const { options, wallets } = useWalletKit();
  const { isMobileLayout } = useResponsive();

  const useGridLayout =
    wallets.length >= options.gridLayoutThreshold! ||
    (isMobileLayout && options.useGridLayoutOnMobile);

  return (
    <>
      <ModalHeader>{options.title}</ModalHeader>

      {options.disclaimer && (
        <Box className={cx('wk-disclaimer', clsDisclaimer)}>{options.disclaimer}</Box>
      )}

      {useGridLayout ? <GridLayout /> : <ListLayout />}
    </>
  );
}
