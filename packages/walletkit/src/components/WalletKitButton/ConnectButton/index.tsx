import { ButtonProps, Button } from '@/base/components/Button';
import { useIsMounted } from '@/base/hooks/useIsMounted';
import { useModal, cx, Action } from '@/index';
import React, { useCallback } from 'react';
import { useAccount } from 'wagmi';
import { ConnectedInfo } from './ConnectedInfo';
import { clsWalletkitButton } from './styles.css';

export interface ConnectButtonProps extends ButtonProps {
  action?: Action;
}

export const ConnectButton = React.forwardRef((props: ConnectButtonProps, ref: any) => {
  const { className, action, onClick, ...restProps } = props;

  const { onOpen } = useModal();
  const { isConnected } = useAccount();
  const isMounted = useIsMounted();

  const onClickButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onOpen({
        action,
      });
      onClick?.(e);
    },
    [action, onClick, onOpen],
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
