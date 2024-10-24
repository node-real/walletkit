import { useTheme } from '@/core/providers/ThemeProvider/context';
import { useKeyDown } from '../../hooks/useKeyDown';
import { useResponsive } from '../../hooks/useResponsive';
import { useScrollLock } from '../../hooks/useScrollLock';
import { cx } from '../../utils/css';
import { BoxProps, Box } from '../Box';
import { Portal } from '../Portal';
import { Transition } from '../Transition';
import { ModalContent } from './ModalContent';
import { clsModal, clsModalOverlay } from './styles.css';

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
  const { colorMode } = useTheme();

  return (
    <Portal>
      <Transition in={isOpen} variant="fade">
        <Box
          className={cx('wk-modal', clsModal, className)}
          style={{
            colorScheme: colorMode,
          }}
          {...restProps}
        >
          <Box
            className={cx('wk-modal-overlay', clsModalOverlay)}
            onClick={() => closeOnOverlayClick && onClose()}
          />
          <Transition in={isOpen} variant={isMobileLayout ? 'modal-slide' : undefined}>
            <ModalContent className={contentClassName}>{children}</ModalContent>
          </Transition>
        </Box>
      </Transition>
    </Portal>
  );
}
