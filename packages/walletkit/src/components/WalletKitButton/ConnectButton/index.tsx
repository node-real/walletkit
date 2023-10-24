import React, { useCallback } from 'react';
import { useOpenModal } from '../../../hooks/useOpenModal';
import { ConnectMode, useWalletKitContext } from '../../WalletKitProvider/context';
import { cx, x } from '../../../utils/css';
import { Button, ButtonProps } from '../../base/Button';
import { walletkitButton } from './styles';

export interface ConnectButtonProps extends ButtonProps {
  connectMode?: ConnectMode;
}

export const ConnectButton = React.forwardRef((props: ConnectButtonProps, ref: any) => {
  const { className, children, connectMode = 'default', onClick, css, ...restProps } = props;

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
      className={cx('wk-walletkit-button', className)}
      onClick={onClickButton}
      css={x(walletkitButton, css)}
      {...restProps}
    >
      {children ?? 'Connect Wallet'}
    </Button>
  );
});
