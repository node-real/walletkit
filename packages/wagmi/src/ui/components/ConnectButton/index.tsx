import { ButtonProps, Button } from '@/ui/base/components/Button';
import { useIsMounted } from '@/ui/base/hooks/useIsMounted';
import { cx } from '@/ui/base/utils/css';
import { useConnectModal } from '@/ui/modals/ConnectModal/context';
import { Action } from '@/ui/types';
import React from 'react';
import { ConnectButtonRenderer } from './ConnectButtonRenderer';
import { ConnectedButton } from './ConnectedButton';
import { clsConnectButton } from './styles.css';
import { useUIAccountInfo } from '@/ui-data/useUIAccountInfo';

export interface WalletButtonProps extends ButtonProps {
  action?: Action;
}

const WalletButton = React.forwardRef((props: WalletButtonProps, ref: any) => {
  const { className, action, onClick, ...restProps } = props;

  const { address } = useUIAccountInfo();

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

export { type WalletButtonType as ConnectButtonProps, ConnectButton };
