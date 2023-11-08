import React, { useCallback } from 'react';
import { ConnectRole, useWalletKitContext } from '../../WalletKitProvider/context';
import { cx } from '../../../base/utils/css';
import { Button, ButtonProps } from '../../../base/components/Button';
import { clsWalletkitButton } from './styles.css';
import { useAccount } from 'wagmi';
import { ConnectedInfo } from './ConnectedInfo';
import { useIsMounted } from '../../../base/hooks/useIsMounted';
import { useModal } from '../../..';

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
      className={cx('wk-walletkit-button', clsWalletkitButton, className)}
      onClick={onClickButton}
      {...restProps}
    >
      Connect Wallet
    </Button>
  );
});
