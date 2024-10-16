import { Box } from '@/core/base/components/Box';
import { ModalHeader } from '@/core/base/components/Modal/ModalHeader';
import { useResponsive } from '@/core/base/hooks/useResponsive';
import { cx } from '@/core/base/utils/css';
import { GridLayout } from './GridLayout';
import { ListLayout } from './ListLayout';
import { clsDisclaimer } from './styles.css';
import { useWalletKit } from '@/core/providers/WalletKitProvider/context';
import { EvmHomeViewWalletConnectUriProvider } from '@/evm/components/EvmHomeViewWalletConnectUriProvider';
import { isMobile, isTMA } from '@/core/base/utils/mobile';

export function HomeView() {
  const { wallets, options } = useWalletKit();
  const { isMobileLayout } = useResponsive();

  const visibleWallets = wallets.filter((item) => item.isVisible !== false);
  const useGridLayout =
    visibleWallets.length >= options.gridLayoutThreshold! ||
    (isMobileLayout && options.useGridLayoutOnMobile);

  const needPreCreateWcUri = isTMA() && isMobile();

  return (
    <>
      <ModalHeader>{options.title}</ModalHeader>

      {options.disclaimer && (
        <Box className={cx(clsDisclaimer, 'wk-disclaimer')}>{options.disclaimer}</Box>
      )}

      {useGridLayout ? (
        <GridLayout visibleWallets={visibleWallets} />
      ) : (
        <ListLayout visibleWallets={visibleWallets} />
      )}

      {needPreCreateWcUri && <EvmHomeViewWalletConnectUriProvider />}
    </>
  );
}
