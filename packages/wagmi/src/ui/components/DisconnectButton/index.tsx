import { ButtonProps, Button } from '@/ui/base/components/Button';
import { ExitIcon } from '@/ui/base/icons/ExitIcon';
import { cx } from '@/ui/base/utils/css';
import { useCloseAllModals } from '@/ui/hooks/useCloseAllModals';
import { clsContainer } from './styles.css';
import { useUIDisconnectButton } from '@/ui-data/useUIDisconnectButton';

export type DisconnectButtonProps = ButtonProps;

export function DisconnectButton(props: DisconnectButtonProps) {
  const { className, ...restProps } = props;

  const { onCloseAllModals } = useCloseAllModals();

  const { onClick } = useUIDisconnectButton();

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
