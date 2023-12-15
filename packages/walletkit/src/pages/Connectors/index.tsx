import { Box } from '@/base/components/Box';
import { ModalHeader } from '@/base/components/Modal/ModalHeader';
import { Navbar } from '@/components/Navbar';
import { useWalletKitContext, cx } from '@/index';
import { useConnect } from 'wagmi';
import { GridLayout } from './GridLayout';
import { ListLayout } from './ListLayout';
import { clsDisclaimer } from './styles.css';
import { LIST_LAYOUT_THRESHOLD } from '@/constants/common';

export function ConnectorsPage() {
  const { connectors } = useConnect();
  const { options, isMobileLayout } = useWalletKitContext();

  const visibleConnectors = connectors.filter((c) => !!c._wallet);
  const useGridLayout = visibleConnectors.length > LIST_LAYOUT_THRESHOLD || isMobileLayout;

  return (
    <>
      <Navbar />
      <ModalHeader>Connect Wallet</ModalHeader>

      {options.disclaimer && (
        <Box className={cx('wk-disclaimer', clsDisclaimer)}>{options.disclaimer}</Box>
      )}

      {useGridLayout ? (
        <GridLayout connectors={visibleConnectors} />
      ) : (
        <ListLayout connectors={visibleConnectors} />
      )}
    </>
  );
}
