import { ButtonProps, Button } from '@/base/components/Button';
import { ExitIcon } from '@/base/icons/ExitIcon';
import { cx, useProfileModal, useSwitchNetworkModal } from '@/index';
import { useConnect, useDisconnect } from 'wagmi';
import { clsContainer } from './styles.css';
import { useConnectModal } from '@/modals/ConnectModal/context';

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

function useCloseAllModals() {
  const connectModal = useConnectModal();
  const switchNetworkModal = useSwitchNetworkModal();
  const profileModal = useProfileModal();

  return {
    onCloseAllModals() {
      connectModal.onClose();
      switchNetworkModal.onClose();
      profileModal.onClose();
    },
  };
}
