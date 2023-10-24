// import { useEffect, useState } from 'react';
import { useEffect, useState } from 'react';
import { cx } from '../../../utils/css';
import { Box, BoxProps } from '../Box';
import { Portal } from '../Portal';
import { fadeIn, fadeOut, modal, modalContent, modalOverlay } from './styles.css';

export interface ModalProps extends BoxProps {
  isOpen: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  contentClassName?: string;
}

export function Modal(props: ModalProps) {
  const { className, isOpen, onClose, children, contentClassName, ...restProps } = props;

  const [isMounted, setIsMounted] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    }
  }, [isOpen]);

  const onAnimationEnd = () => {
    if (!isOpen) {
      setIsMounted(false);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Portal>
      <Box
        className={cx('wk-modal', modal, isOpen ? fadeIn : fadeOut, className)}
        onAnimationEnd={onAnimationEnd}
        {...restProps}
      >
        <Box className={cx('wk-modal-overlay', modalOverlay)} onClick={onClose} />
        <Box className={cx('wk-modal-content', modalContent, contentClassName)}>{children}</Box>
      </Box>
    </Portal>
  );
}
