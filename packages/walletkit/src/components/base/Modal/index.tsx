import { cx } from '../../../utils/css';
import { Box, BoxProps } from '../Box';
import { Portal } from '../Portal';
import { modal, modalContent, modalOverlay } from './styles.css';
import { Animation } from '../Animation';

export interface ModalProps extends BoxProps {
  isOpen: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  contentClassName?: string;
}

export function Modal(props: ModalProps) {
  const { className, isOpen, onClose, children, contentClassName, ...restProps } = props;

  return (
    <Portal>
      <Animation in={isOpen} variant="fade">
        <Box className={cx('wk-modal', modal, className)} {...restProps}>
          <Box className={cx('wk-modal-overlay', modalOverlay)} onClick={onClose} />
          <Box className={cx('wk-modal-content', modalContent, contentClassName)}>{children}</Box>
        </Box>
      </Animation>
    </Portal>
  );
}
