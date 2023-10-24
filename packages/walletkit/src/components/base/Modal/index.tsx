import { useEffect, useState } from 'react';
import { cx, x } from '../../../utils/css';
import { Box, BoxProps, CSSProps } from '../Box';
import { Portal } from '../Portal';
import { modal, modalContent, modalOverlay } from './styles';
import { keyframes } from '@emotion/react';

export interface ModalProps extends BoxProps {
  isOpen: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  contentCss?: CSSProps;
}

export function Modal(props: ModalProps) {
  const { className, isOpen, onClose, children, css, contentCss, ...restProps } = props;

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

  const finalStyle = x({ ...modal, animation: `${isOpen ? fadeIn : fadeOut} 300ms forwards` }, css);

  return (
    <Portal>
      <Box
        className={cx('wk-modal', className)}
        css={finalStyle}
        onAnimationEnd={onAnimationEnd}
        {...restProps}
      >
        <Box className="wk-modal-overlay" css={modalOverlay} onClick={onClose} />
        <Box className="wk-modal-content" css={x(modalContent, contentCss)}>
          {children}
        </Box>
      </Box>
    </Portal>
  );
}

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;
