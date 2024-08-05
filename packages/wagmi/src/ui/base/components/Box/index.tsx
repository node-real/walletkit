import React from 'react';
import { cx } from '@/ui/index';
import { clsBox } from './styles.css';

type HTMLProperties<T = HTMLElement> = Omit<React.AllHTMLAttributes<T>, 'as'>;

export interface BoxProps extends HTMLProperties {
  as?: React.ElementType;
}

export const Box = React.forwardRef<HTMLElement, BoxProps>((props: BoxProps, ref: any) => {
  const { as = 'div', className, ...restProps } = props;

  return React.createElement(as, {
    ref,
    className: cx(clsBox, className),
    ...restProps,
  });
});

Box.displayName = 'Box';
