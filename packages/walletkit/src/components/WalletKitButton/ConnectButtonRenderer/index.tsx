import { Chain, useAccount, useNetwork } from 'wagmi';
import { useIsMounted } from '../../../hooks/useIsMounted';
import { ConnectRole, useWalletKitContext } from '../../WalletKitProvider/context';
import { useOpenModal } from '../../../hooks/useOpenModal';
import { useCallback } from 'react';

export interface ConnectButtonRendererProps {
  role?: ConnectRole;

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
  const { role = 'default', children } = props;

  const isMounted = useIsMounted();
  const { isOpen, onClose, setConnectRole } = useWalletKitContext();
  const { onOpenModal } = useOpenModal();

  const { chain } = useNetwork();
  const { address } = useAccount();

  const onOpen = useCallback(() => {
    setConnectRole(role);
    onOpenModal();
  }, [onOpenModal, setConnectRole, role]);

  if (!children || !isMounted) return null;

  return (
    <>
      {children({
        show: onOpen,
        hide: onClose,
        chain: chain,
        unsupported: !!chain?.unsupported,
        isConnected: !!address,
        isConnecting: isOpen, // Using `open` to determine if connecting as wagmi isConnecting only is set to true when an active connector is awaiting connection
        address: address,
      })}
    </>
  );
}
