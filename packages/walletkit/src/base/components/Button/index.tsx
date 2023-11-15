import React from 'react';
import { cx } from '../../utils/css';
import { clsButton } from './styles.css';
import { Box, BoxProps } from '../Box';

export type ButtonProps = BoxProps;

export const Button = React.forwardRef<HTMLElement, ButtonProps>((props: ButtonProps, ref: any) => {
  const { className, ...restProps } = props;

  return (
    <Box ref={ref} as="button" className={cx('wk-button', clsButton, className)} {...restProps} />
  );
});

Button.displayName = 'Button';
