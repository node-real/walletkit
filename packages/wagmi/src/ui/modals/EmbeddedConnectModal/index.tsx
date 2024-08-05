import { Connectors } from '../ConnectModal/Connectors';
import { ConnectModal } from '../ConnectModal';
import { BoxProps, Box } from '@/ui/base/components/Box';
import { ModalContent } from '@/ui/base/components/Modal/ModalContent';
import { cx } from '@/ui/base/utils/css';
import { clsModal, clsContent } from './style.css';

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
