import React from 'react';
import { Box, BoxProps } from '../Box';
import { x } from '../../../utils/css';
import { button } from './styles';

export type ButtonProps = BoxProps;

export const Button = React.forwardRef<HTMLElement, ButtonProps>((props: ButtonProps, ref: any) => {
  const { css, ...restProps } = props;

  return <Box ref={ref} as="button" css={x(button, css)} {...restProps} />;
});

Button.displayName = 'Button';
