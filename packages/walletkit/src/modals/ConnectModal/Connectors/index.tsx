import { Box } from '@/base/components/Box';
import { ModalHeader } from '@/base/components/Modal/ModalHeader';
import { cx } from '@/index';
import { GridLayout } from './GridLayout';
import { ListLayout } from './ListLayout';
import { clsDisclaimer } from './styles.css';
import { useWalletKit } from '@/components/WalletKitProvider/context';

export function Connectors() {
  const { options, isMobileLayout, wallets } = useWalletKit();

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
