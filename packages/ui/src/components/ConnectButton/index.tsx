import { ButtonProps, Button } from '@/base/components/Button';
import { useIsMounted } from '@/base/hooks/useIsMounted';
import { cx } from '@/index';
import React from 'react';
import { ConnectedButton } from './ConnectedButton';
import { clsConnectButton } from './styles.css';
import { useConnectModal } from '@/modals/ConnectModal/context';
import { Action, useDataSource } from '@/components/DataSourceProvider/context';
import { ConnectButtonRenderer } from './ConnectButtonRenderer';

export interface WalletButtonProps extends ButtonProps {
  action?: Action;
}

const WalletButton = React.forwardRef((props: WalletButtonProps, ref: any) => {
  const { className, action, onClick, ...restProps } = props;

  const { useAccount } = useDataSource();
  const { address } = useAccount();

  const connectModal = useConnectModal();
  const isMounted = useIsMounted();

  const onOpenConnectModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    connectModal.onOpen({
      action,
    });
    onClick?.(e);
  };

  if (address) {
    if (isMounted) {
      return <ConnectedButton />;
    } else {
      return null;
    }
  }

  return (
    <Button
      ref={ref}
      className={cx('wk-connect-button', clsConnectButton, className)}
      onClick={onOpenConnectModal}
      {...restProps}
    >
      Connect Wallet
    </Button>
  );
});

type WalletButtonType = typeof WalletButton & {
  Custom: typeof ConnectButtonRenderer;
};

(WalletButton as WalletButtonType).Custom = ConnectButtonRenderer;
const ConnectButton = WalletButton as WalletButtonType;

export { type WalletButtonProps as ConnectButtonProps, ConnectButton };
