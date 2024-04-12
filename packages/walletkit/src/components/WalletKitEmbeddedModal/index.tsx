import { ModalContent } from '@/base/components/Modal/ModalContent';
import { Connectors } from '../WalletKitModal/Connectors';
import { cx } from '@/base/utils/css';
import { clsModal, clsContent } from './style.css';
import { Box, BoxProps } from '@/base/components/Box';
import { WalletKitModal } from '../WalletKitModal';

export function WalletKitEmbeddedModal(props: BoxProps) {
  const { className, ...restProps } = props;

  return (
    <>
      <Box className={cx('wk-embedded-modal', clsModal, className)} {...restProps}>
        <ModalContent className={clsContent} {...restProps}>
          <Connectors />
        </ModalContent>
      </Box>

      <WalletKitModal />
    </>
  );
}
