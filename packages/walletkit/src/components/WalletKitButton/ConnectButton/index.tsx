import React, { useCallback } from 'react';
import { useOpenModal } from '../../../hooks/useOpenModal';
import { ConnectVariant, useWalletKitContext } from '../../WalletKitProvider/context';
import { cx } from '../../../utils/css';
import { Button, ButtonProps } from '../../base/Button';
import { walletkitButton } from './styles.css';

export interface ConnectButtonProps extends ButtonProps {
  variant?: ConnectVariant;
}

export const ConnectButton = React.forwardRef((props: ConnectButtonProps, ref: any) => {
  const { className, children, variant = 'default', onClick, ...restProps } = props;

  const { setConnectVariant } = useWalletKitContext();
  const { onOpenModal } = useOpenModal();

  const onClickButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setConnectVariant(variant);

      onOpenModal();
      onClick?.(e);
    },
    [variant, onClick, onOpenModal, setConnectVariant],
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
