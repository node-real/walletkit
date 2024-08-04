import { ButtonProps, Button } from '@/base/components/Button';
import { ExitIcon } from '@/base/icons/ExitIcon';
import { cx } from '@/index';
import { clsContainer } from './styles.css';
import { useDataSource } from '../DataSourceProvider/context';
import { useCloseAllModals } from '@/hooks/useCloseAllModals';

export type DisconnectButtonProps = ButtonProps;

export function DisconnectButton(props: DisconnectButtonProps) {
  const { className, ...restProps } = props;

  const { onCloseAllModals } = useCloseAllModals();

  const { useDisconnectButton } = useDataSource();
  const { onClick } = useDisconnectButton();

  const onDisconnect = () => {
    onCloseAllModals();
    setTimeout(() => {
      onClick();
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
