import { BoxProps, Box } from '@/core/base/components/Box';
import { ModalContent } from '@/core/base/components/Modal/ModalContent';
import { cx } from '@/core/base/utils/css';
import { ConnectModal } from '../ConnectModal';
import { clsModal, clsContent } from './style.css';
import { HomeView } from '../ConnectModal/HomeView';

export function EmbeddedConnectModal(props: BoxProps) {
  const { className, ...restProps } = props;

  return (
    <>
      <Box className={cx('wk-embedded-connect-modal', clsModal, className)} {...restProps}>
        <ModalContent className={clsContent} {...restProps}>
          <HomeView />
        </ModalContent>
      </Box>

      <ConnectModal />
    </>
  );
}
