import { ButtonProps, Button } from '@/base/components/Button';
import { useIsMounted } from '@/base/hooks/useIsMounted';
import { ConnectRole, useWalletKitContext, useModal, cx } from '@/index';
import React, { useCallback } from 'react';
import { useAccount } from 'wagmi';
import { ConnectedInfo } from './ConnectedInfo';
import { clsWalletkitButton } from './styles.css';

export interface ConnectButtonProps extends ButtonProps {
  role?: ConnectRole;
}

export const ConnectButton = React.forwardRef((props: ConnectButtonProps, ref: any) => {
  const { className, role = 'default', onClick, ...restProps } = props;

  const { setConnectRole } = useWalletKitContext();
  const { onOpen } = useModal();
  const { isConnected } = useAccount();
  const isMounted = useIsMounted();

  const onClickButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setConnectRole(role);

      onOpen();
      onClick?.(e);
    },
    [role, onClick, onOpen, setConnectRole],
  );

  if (!isMounted) return null;

  if (isConnected) {
    return <ConnectedInfo />;
  }

  return (
    <Button
      ref={ref}
      className={cx('wk-connect-button', clsWalletkitButton, className)}
      onClick={onClickButton}
      {...restProps}
    >
      Connect Wallet
    </Button>
  );
});
