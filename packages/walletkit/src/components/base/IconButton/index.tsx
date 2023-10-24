import React from 'react';
import { x } from '../../../utils/css';
import { Button, ButtonProps } from '../Button';
import { iconButton } from './styles';

export interface IconButtonProps extends ButtonProps {
  icon: React.ReactElement;
}

export const IconButton = React.forwardRef<HTMLElement, IconButtonProps>(
  (props: IconButtonProps, ref: any) => {
    const { icon, css, ...restProps } = props;

    return (
      <Button ref={ref} css={x(iconButton, css)} {...restProps}>
        {icon}
      </Button>
    );
  },
);

IconButton.displayName = 'IconButton';
