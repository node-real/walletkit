import { useUIAccountInfo } from '@/ui-data/useUIAccountInfo';
import { useUIChainInfo } from '@/ui-data/useUIChainInfo';
import { useConnectModal } from '@/ui/modals/ConnectModal/context';
import { useProfileModal } from '@/ui/modals/ProfileModal/context';
import { Action } from '@/ui/types';
import { truncateAddress } from '@/ui/utils/account';
import { useCallback } from 'react';

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

  const { address } = useUIAccountInfo();
  const { chain, isSupported } = useUIChainInfo();

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
