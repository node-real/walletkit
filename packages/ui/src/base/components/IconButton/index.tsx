import React from 'react';
import { ButtonProps, Button } from '../Button';
import { clsIconButton } from './styles.css';
import { cx } from '@/base/utils/css';

export interface IconButtonProps extends ButtonProps {
  icon: React.ReactElement;
}

export const IconButton = (props: IconButtonProps) => {
  const { className, icon, ...restProps } = props;

  return (
    <Button className={cx('wk-icon-button', clsIconButton, className)} {...restProps}>
      {icon}
    </Button>
  );
};

IconButton.displayName = 'IconButton';
