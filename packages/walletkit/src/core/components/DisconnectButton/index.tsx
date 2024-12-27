import { Button, ButtonProps } from '@/core/base/components/Button';
import { useConnect, useDisconnect } from 'wagmi';
import { clsContainer } from './styles.css';
import { cx } from '@/core/base/utils/css';
import { ExitIcon } from '@/core/base/icons/ExitIcon';
import { useCloseAllModals } from '@/core/hooks/useCloseAllModals';

export type DisconnectButtonProps = ButtonProps;

export function DisconnectButton(props: DisconnectButtonProps) {
  const { className, ...restProps } = props;

  const { reset } = useConnect();
  const { disconnect } = useDisconnect();
  const { onCloseAllModals } = useCloseAllModals();

  const onDisconnect = () => {
    onCloseAllModals();
    setTimeout(() => {
      disconnect();
      reset();
    }, 100);
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
