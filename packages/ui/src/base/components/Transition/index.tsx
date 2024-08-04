import React, { useEffect, useState } from 'react';
import { cx } from '@/base/utils/css';
import { clsFadeIn, clsFadeOut } from './fade.css';
import { clsToastSlideIn, clsToastSlideOut } from './toastSlide.css';
import { clsModalSlideIn, clsModalSlideOut } from './modalSlide.css';

const animationMap = {
  fade: [clsFadeOut, clsFadeIn],
  'toast-slide': [clsToastSlideOut, clsToastSlideIn],
  'modal-slide': [clsModalSlideOut, clsModalSlideIn],
};

export interface TransitionProps {
  in: boolean;
  children: React.ReactElement;
  variant?: keyof typeof animationMap;
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
