import React, { useCallback } from 'react';
import { useOpenModal } from '../../../hooks/useOpenModal';
import { ConnectRole, useWalletKitContext } from '../../WalletKitProvider/context';
import { cx } from '../../../utils/css';
import { Button, ButtonProps } from '../../../base/Button';
import { clsWalletkitButton } from './styles.css';
import { useAccount } from 'wagmi';
import { ConnectedInfo } from './ConnectedInfo';

export interface ConnectButtonProps extends ButtonProps {
  role?: ConnectRole;
}

export const ConnectButton = React.forwardRef((props: ConnectButtonProps, ref: any) => {
  const { className, role = 'default', onClick, ...restProps } = props;

  const { setConnectRole } = useWalletKitContext();
  const { onOpenModal } = useOpenModal();
  const { isConnected } = useAccount();

  const onClickButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setConnectRole(role);

      onOpenModal();
      onClick?.(e);
    },
    [role, onClick, onOpenModal, setConnectRole],
  );

  if (isConnected) {
    return <ConnectedInfo />;
  }

  return (
    <Button
      ref={ref}
      className={cx('wk-walletkit-button', clsWalletkitButton, className)}
      onClick={onClickButton}
      {...restProps}
    >
      Connect Wallet
    </Button>
  );
});
