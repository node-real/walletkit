import { ButtonProps, Button } from '@/base/components/Button';
import { useIsMounted } from '@/base/hooks/useIsMounted';
import { cx } from '@/index';
import React, { useCallback } from 'react';
import { useAccount } from 'wagmi';
import { ConnectedInfo } from './ConnectedInfo';
import { clsWalletkitButton } from './styles.css';
import { useWalletKitModal } from '@/components/WalletKitModal/WalletKitModalProvider/context';
import { Action } from '@/components/WalletKitProvider/context';

export interface ConnectButtonProps extends ButtonProps {
  action?: Action;
}

export const ConnectButton = React.forwardRef((props: ConnectButtonProps, ref: any) => {
  const { className, action, onClick, ...restProps } = props;

  const { onOpen } = useWalletKitModal();
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
