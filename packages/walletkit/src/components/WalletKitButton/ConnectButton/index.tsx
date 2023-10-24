import React, { useCallback } from 'react';
import { useOpenModal } from '../../../hooks/useOpenModal';
import { ConnectMode, useWalletKitContext } from '../../WalletKitProvider/context';
import { cx } from '../../../utils/css';
import { Button, ButtonProps } from '../../base/Button';
import { walletkitButton } from './styles.css';

export interface ConnectButtonProps extends ButtonProps {
  connectMode?: ConnectMode;
}

export const ConnectButton = React.forwardRef((props: ConnectButtonProps, ref: any) => {
  const { className, children, connectMode = 'default', onClick, ...restProps } = props;

  const { setConnectMode } = useWalletKitContext();
  const { onOpenModal } = useOpenModal();

  const onClickButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setConnectMode(connectMode);

      onOpenModal();
      onClick?.(e);
    },
    [connectMode, onClick, onOpenModal, setConnectMode],
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
