import { ModalContent } from '@/base/components/Modal/ModalContent';
import { cx } from '@/base/utils/css';
import { clsModal, clsContent } from './style.css';
import { Box, BoxProps } from '@/base/components/Box';
import { Connectors } from '../ConnectModal/Connectors';
import { ConnectModal } from '../ConnectModal';

export function EmbeddedConnectModal(props: BoxProps) {
  const { className, ...restProps } = props;

  return (
    <>
      <Box className={cx('wk-embedded-connect-modal', clsModal, className)} {...restProps}>
        <ModalContent className={clsContent} {...restProps}>
          <Connectors />
        </ModalContent>
      </Box>

      <ConnectModal />
    </>
  );
}
