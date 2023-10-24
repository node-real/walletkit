import React from 'react';
import { cx } from '../../../utils/css';
import { Button, ButtonProps } from '../Button';
import { iconButton } from './styles.css';

export interface IconButtonProps extends ButtonProps {
  icon: React.ReactElement;
}

export const IconButton = (props: IconButtonProps) => {
  const { className, icon, ...restProps } = props;

  return (
    <Button className={cx(iconButton, className)} {...restProps}>
      {icon}
    </Button>
  );
};

IconButton.displayName = 'IconButton';
