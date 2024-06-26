import { useProfileModal } from '@/components/ProfileModal/ProfileModalProvider/context';
import { useWalletKitModal } from '@/components/WalletKitModal/WalletKitModalProvider/context';
import { Action } from '@/components/WalletKitProvider/context';
import { truncateAddress } from '@/utils/account';
import { useCallback } from 'react';
import { Chain, useAccount, useEnsName, useNetwork } from 'wagmi';

export interface ConnectButtonRendererProps {
  action?: Action;

  children?: (renderProps: {
    show: () => void;
    hide: () => void;
    chain?: Chain & {
      unsupported?: boolean;
    };
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

  const { isOpen, onOpen, onClose } = useWalletKitModal();
  const { onOpen: onOpenProfileModal } = useProfileModal();

  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();

  const { data: ensName } = useEnsName({
    chainId: 1,
    address: address,
  });

  const onOpenModal = useCallback(() => {
    onOpen({
      action,
    });
  }, [action, onOpen]);

  if (!children) return null;

  return (
    <>
      {children({
        show: isConnected ? onOpenProfileModal : onOpenModal,
        hide: onClose,
        chain: chain,
        unsupported: !!chain?.unsupported,
        isConnected: !!address,
        isConnecting: isOpen, // Using `open` to determine if connecting as wagmi isConnecting only is set to true when an active connector is awaiting connection
        address: address,
        truncatedAddress: address ? truncateAddress(address) : undefined,
        ensName: ensName?.toString(),
      })}
    </>
  );
}
