import React from 'react';
import { clsIconButton } from './styles.css';
import { ButtonProps, Button } from '../Button';
import { cx } from '../../utils/css';

export interface IconButtonProps extends ButtonProps {
  icon: React.ReactElement;
}

export const IconButton = (props: IconButtonProps) => {
  const { className, icon, ...restProps } = props;

  return (
    <Button className={cx(clsIconButton, 'wk-icon-button', className)} {...restProps}>
      {icon}
    </Button>
  );
};

IconButton.displayName = 'IconButton';
