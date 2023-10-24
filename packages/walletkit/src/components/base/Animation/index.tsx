import React, { useEffect, useState } from 'react';
import { cx } from '../../../utils/css';
import { fadeIn, fadeOut } from './styles.css';

const animationMap = {
  fade: [fadeOut, fadeIn],
};

export interface AnimationProps {
  in: boolean;
  children: React.ReactElement;
  type?: 'fade';
}

export const Animation = (props: AnimationProps) => {
  const { in: show, children, type = 'fade' } = props;

  const { className, onAnimationEnd, ...restProps } = children.props;

  const [isMounted, setIsMounted] = useState(show);

  useEffect(() => {
    if (show) {
      setIsMounted(true);
    }
  }, [show]);

  const onEnd = (e: AnimationEvent) => {
    onAnimationEnd?.(e);
    if (!show) {
      setIsMounted(false);
    }
  };

  if (!isMounted) {
    return null;
  }

  return React.cloneElement(children, {
    className: cx(animationMap[type][Number(show)], className),
    onAnimationEnd: onEnd,
    ...restProps,
  });
};
