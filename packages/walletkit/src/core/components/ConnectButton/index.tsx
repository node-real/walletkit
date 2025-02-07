import { Button, ButtonProps } from '@/core/base/components/Button';
import { useIsMounted } from '@/core/base/hooks/useIsMounted';
import { useConnectModal } from '@/core/modals/ConnectModal/context';
import { Action } from '@/core/providers/WalletKitProvider/context';
import React, { useCallback } from 'react';
import { useAccount } from 'wagmi';
import { clsWalletkitButton } from './style.css';
import { cx } from '@/core/base/utils/css';
import { ConnectedInfo } from './ConnectedInfo';

export interface ConnectButtonProps extends ButtonProps {
  action?: Action;
}

export const ConnectButton = React.forwardRef((props: ConnectButtonProps, ref: any) => {
  const { className, action, onClick, ...restProps } = props;

  const { onOpen } = useConnectModal();
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

  if (isConnected) {
    if (isMounted) {
      return <ConnectedInfo />;
    } else {
      return null;
    }
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
