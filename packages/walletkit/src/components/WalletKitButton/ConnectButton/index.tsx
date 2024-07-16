import { ButtonProps, Button } from '@/base/components/Button';
import { useIsMounted } from '@/base/hooks/useIsMounted';
import { cx } from '@/index';
import React from 'react';
import { useAccount } from 'wagmi';
import { ConnectedInfo } from './ConnectedInfo';
import { clsWalletkitButton } from './styles.css';
import { Action } from '@/components/WalletKitProvider/context';
import { useConnectModal } from '@/modals/ConnectModal/context';

export interface ConnectButtonProps extends ButtonProps {
  action?: Action;
}

export const ConnectButton = React.forwardRef((props: ConnectButtonProps, ref: any) => {
  const { className, action, onClick, ...restProps } = props;

  const connectModal = useConnectModal();
  const { address } = useAccount();
  const isMounted = useIsMounted();

  const onOpenConnectModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    connectModal.onOpen({
      action,
    });
    onClick?.(e);
  };

  if (address) {
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
      onClick={onOpenConnectModal}
      {...restProps}
    >
      Connect Wallet
    </Button>
  );
});
