import { Action } from '@/components/WalletKitProvider/context';
import { useChainIsSupported } from '@/hooks/useChainIsSupported';
import { useConnectModal } from '@/modals/ConnectModal/context';
import { useProfileModal } from '@/modals/ProfileModal/context';
import { truncateAddress } from '@/utils/account';
import { useCallback } from 'react';
import { Chain } from 'viem';
import { useAccount } from 'wagmi';

export interface ConnectButtonRendererProps {
  action?: Action;

  children?: (renderProps: {
    show: () => void;
    hide: () => void;
    chain?: Chain;
    unsupported: boolean;
    isConnected: boolean;
    isConnecting: boolean;
    address?: string;
    truncatedAddress?: string;
    ensName?: string;
  }) => React.ReactNode;
}

export function ConnectButtonRenderer(props: ConnectButtonRendererProps) {
  const { action, children } = props;

  const { address, chain } = useAccount();
  const connectModal = useConnectModal();
  const profileModal = useProfileModal();
  const isSupported = useChainIsSupported();

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
        chain: chain,
        unsupported: !isSupported,
        isConnected: !!address,
        isConnecting: connectModal.isOpen, // Using `open` to determine if connecting as wagmi isConnecting only is set to true when an active connector is awaiting connection
        address: address,
        truncatedAddress: address ? truncateAddress(address) : undefined,
      })}
    </>
  );
}
