import React, { useEffect, useState } from 'react';
import { cx } from '../../../utils/css';
import { fadeIn, fadeOut } from './fade.css';
import { toastSlideIn, toastSlideOut } from './toastSlide.css';

const animationMap = {
  fade: [fadeOut, fadeIn],
  'toast-slide': [toastSlideOut, toastSlideIn],
};

export interface AnimationProps {
  in: boolean;
  children: React.ReactElement;
  variant?: 'fade' | 'toast-slide';
  onExit?: () => void;
}

export const Animation = (props: AnimationProps) => {
  const { in: show, children, variant = 'fade', onExit } = props;

  const { className, onAnimationEnd, ...restProps } = children.props;

  const [isMounted, setIsMounted] = useState(show);

  useEffect(() => {
    if (show) {
      setIsMounted(true);
    }
  }, [show]);

  const onPlayEnd = (e: AnimationEvent) => {
    onAnimationEnd?.(e);
    if (!show) {
      onExit?.();
      setIsMounted(false);
    }
  };

  if (!isMounted) {
    return null;
  }

  return React.cloneElement(children, {
    className: cx(animationMap[variant][Number(show)], className),
    onAnimationEnd: onPlayEnd,
    ...restProps,
  });
};
