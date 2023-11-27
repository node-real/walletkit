import { useKeyDown } from '@/base/hooks/useKeyDown';
import { cx } from '@/base/utils/css';
import { BoxProps, Box } from '../Box';
import { Portal } from '../Portal';
import { Transition } from '../Transition';
import { clsModal, clsModalOverlay, clsModalContent } from './styles.css';
import { useScrollLock } from '@/base/hooks/useScrollLock';
import { useResponsive } from '@/base/hooks/useResponsive';

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

  useScrollLock(isOpen);

  const { isMobileLayout } = useResponsive();

  return (
    <Portal>
      <Transition in={isOpen} variant="fade">
        <Box className={cx('wk-modal', clsModal, className)} {...restProps}>
          <Box
            className={cx('wk-modal-overlay', clsModalOverlay)}
            onClick={() => closeOnOverlayClick && onClose()}
          />
          <Transition in={isOpen} variant={isMobileLayout ? 'modal-slide' : undefined}>
            <Box className={cx('wk-modal-content', clsModalContent, contentClassName)}>
              {children}
            </Box>
          </Transition>
        </Box>
      </Transition>
    </Portal>
  );
}
