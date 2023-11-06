import { Chain, useAccount, useEnsName, useNetwork } from 'wagmi';
import { ConnectRole, useWalletKitContext } from '../../WalletKitProvider/context';
import { useOpenModal } from '../../../hooks/useOpenModal';
import { useCallback } from 'react';
import { truncateAddress } from '../../../utils/account';

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

  const { isOpen, onClose, setConnectRole } = useWalletKitContext();
  const { onOpenModal } = useOpenModal();

  const { chain } = useNetwork();
  const { address } = useAccount();

  const { data: ensName } = useEnsName({
    chainId: 1,
    address: address,
  });

  const onOpen = useCallback(() => {
    setConnectRole(role);
    onOpenModal();
  }, [onOpenModal, setConnectRole, role]);

  if (!children) return null;

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
        truncatedAddress: address ? truncateAddress(address) : undefined,
        ensName: ensName?.toString(),
      })}
    </>
  );
}
