import { useKeyDown } from '@/base/hooks/useKeyDown';
import { cx } from '@/base/utils/css';
import { BoxProps, Box } from '../Box';
import { Portal } from '../Portal';
import { Transition } from '../Transition';
import { clsModal, clsModalOverlay, clsModalContent } from './styles.css';

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
      <Transition in={isOpen} variant="fade">
        <Box className={cx('wk-modal', clsModal, className)} {...restProps}>
          <Box
            className={cx('wk-modal-overlay', clsModalOverlay)}
            onClick={() => closeOnOverlayClick && onClose()}
          />
          <Box className={cx('wk-modal-content', clsModalContent, contentClassName)}>
            {children}
          </Box>
        </Box>
      </Transition>
    </Portal>
  );
}
