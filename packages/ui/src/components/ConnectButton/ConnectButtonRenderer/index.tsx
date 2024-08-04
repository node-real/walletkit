import { useConnectModal } from '@/modals/ConnectModal/context';
import { useProfileModal } from '@/modals/ProfileModal/context';
import { truncateAddress } from '@/utils/account';
import { useCallback } from 'react';
import { Action, useDataSource } from '@/components/DataSourceProvider/context';

export interface ConnectButtonRendererProps {
  action?: Action;

  children?: (renderProps: {
    show: () => void;
    hide: () => void;
    chain?: any;
    unsupported: boolean;
    isConnected: boolean;
    isConnecting: boolean;
    address?: string;
    truncatedAddress?: string;
  }) => React.ReactNode;
}

export function ConnectButtonRenderer(props: ConnectButtonRendererProps) {
  const { action, children } = props;

  const { useAccount, useChain } = useDataSource();
  const { address } = useAccount();
  const { chain, isSupported } = useChain();

  const connectModal = useConnectModal();
  const profileModal = useProfileModal();

  const onOpenConnectModal = useCallback(() => {
    connectModal.onOpen({
      action,
    });
  }, [action, connectModal]);

  if (!children) return null;

  return (
    <>
      {children({
        show: address ? profileModal.onOpen : onOpenConnectModal,
        hide: address ? profileModal.onClose : connectModal.onClose,
        chain,
        unsupported: !isSupported,
        isConnected: !!address,
        isConnecting: connectModal.isOpen, // Using `open` to determine whether an active connector is awaiting connection
        address: address,
        truncatedAddress: address ? truncateAddress(address) : undefined,
      })}
    </>
  );
}
