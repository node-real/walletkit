import { useConnect, useDisconnect } from 'wagmi';
import { Button, ButtonProps } from '../../base/Button';
import { ExitIcon } from '../../base/icons/ExitIcon';
import { useWalletKitContext } from '../WalletKitProvider/context';
import { cx } from '../../utils/css';
import { clsContainer } from './styles.css';

export type DisconnectButtonProps = ButtonProps;

export function DisconnectButton(props: DisconnectButtonProps) {
  const { className, ...restProps } = props;

  const { reset } = useConnect();
  const { disconnect } = useDisconnect();
  const { onClose } = useWalletKitContext();

  const onDisconnect = () => {
    disconnect();
    reset();
    onClose();
  };

  return (
    <Button
      className={cx('wk-disconnect-button', clsContainer, className)}
      onClick={onDisconnect}
      {...restProps}
    >
      <ExitIcon />
      Disconnect
    </Button>
  );
}
