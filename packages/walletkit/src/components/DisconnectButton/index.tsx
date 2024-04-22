import { ButtonProps, Button } from '@/base/components/Button';
import { ExitIcon } from '@/base/icons/ExitIcon';
import { cx } from '@/index';
import { useConnect, useDisconnect } from 'wagmi';
import { clsContainer } from './styles.css';
import { useProfileModal } from '@/components/ProfileModal/ProfileModalProvider/context';
import { useSwitchNetworkModal } from '@/components/SwitchNetworkModal/SwitchNetworkProvider/context';
import { useWalletKitModal } from '@/components/WalletKitModal/WalletKitModalProvider/context';

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
  const walletkitModal = useWalletKitModal();
  const switchNetworkModal = useSwitchNetworkModal();
  const profileModal = useProfileModal();

  return {
    onCloseAllModals() {
      walletkitModal.onClose();
      switchNetworkModal.onClose();
      profileModal.onClose();
    },
  };
}
