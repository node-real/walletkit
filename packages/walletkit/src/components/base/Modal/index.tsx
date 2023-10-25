import { cx } from '../../../utils/css';
import { Box, BoxProps } from '../Box';
import { Portal } from '../Portal';
import { modal, modalContent, modalOverlay } from './styles.css';
import { Animation } from '../Animation';
import { useKeyDown } from '../../../hooks/useKeyDown';

export interface ModalProps extends BoxProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  contentClassName?: string;
  closeOnEsc?: boolean;
  closeOnOverlayClick?: boolean;
}

export function Modal(props: ModalProps) {
  const {
    className,
    isOpen,
    onClose,
    children,
    contentClassName,
    closeOnEsc = true,
    closeOnOverlayClick = true,
    ...restProps
  } = props;

  useKeyDown({
    key: 'Escape',
    enabled: isOpen && closeOnEsc,
    handler() {
      onClose();
    },
  });

  return (
    <Portal>
      <Animation in={isOpen} variant="fade">
        <Box className={cx('wk-modal', modal, className)} {...restProps}>
          <Box
            className={cx('wk-modal-overlay', modalOverlay)}
            onClick={() => closeOnOverlayClick && onClose()}
          />
          <Box className={cx('wk-modal-content', modalContent, contentClassName)}>{children}</Box>
        </Box>
      </Animation>
    </Portal>
  );
}
