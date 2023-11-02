import React, { useCallback } from 'react';
import { useOpenModal } from '../../../hooks/useOpenModal';
import { ConnectRole, useWalletKitContext } from '../../WalletKitProvider/context';
import { cx } from '../../../utils/css';
import { Button, ButtonProps } from '../../base/Button';
import { walletkitButton } from './styles.css';

export interface ConnectButtonProps extends ButtonProps {
  role?: ConnectRole;
}

export const ConnectButton = React.forwardRef((props: ConnectButtonProps, ref: any) => {
  const { className, children, role = 'default', onClick, ...restProps } = props;

  const { setConnectRole } = useWalletKitContext();
  const { onOpenModal } = useOpenModal();

  const onClickButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setConnectRole(role);

      onOpenModal();
      onClick?.(e);
    },
    [role, onClick, onOpenModal, setConnectRole],
  );

  return (
    <Button
      ref={ref}
      className={cx('wk-walletkit-button', walletkitButton, className)}
      onClick={onClickButton}
      {...restProps}
    >
      {children ?? 'Connect Wallet'}
    </Button>
  );
});
