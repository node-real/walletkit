import { clsButton } from './styles.css';
import React from 'react';
import { Box, BoxProps } from '../Box';
import { cx } from '@/ui/index';

export type ButtonProps = BoxProps;

export const Button = React.forwardRef<HTMLElement, ButtonProps>((props: ButtonProps, ref: any) => {
  const { className, ...restProps } = props;

  return (
    <Box ref={ref} as="button" className={cx('wk-button', clsButton, className)} {...restProps} />
  );
});

Button.displayName = 'Button';
