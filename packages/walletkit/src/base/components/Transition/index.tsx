import React, { useEffect, useState } from 'react';
import { cx } from '@/base/utils/css';
import { clsFadeIn, clsFadeOut } from './fade.css';
import { clsToastSlideIn, clsToastSlideOut } from './toastSlide.css';

const animationMap = {
  fade: [clsFadeOut, clsFadeIn],
  'toast-slide': [clsToastSlideOut, clsToastSlideIn],
};

export interface TransitionProps {
  in: boolean;
  children: React.ReactElement;
  variant?: 'fade' | 'toast-slide';
  onExit?: () => void;
}

export const Transition = (props: TransitionProps) => {
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
