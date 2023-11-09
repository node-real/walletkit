import { Chain, useAccount, useEnsName, useNetwork } from 'wagmi';
import { ConnectRole, useWalletKitContext } from '../../WalletKitProvider/context';
import { useCallback } from 'react';
import { truncateAddress } from '../../../utils/account';
import { routes } from '../../RouteProvider';
import { useRouter } from '../../RouteProvider/context';
import { useModal } from '../../ModalProvider/context';

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

  const { setConnectRole } = useWalletKitContext();
  const { isOpen, onOpen, onClose, onOpenProfile } = useModal();

  const router = useRouter();
  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();

  const { data: ensName } = useEnsName({
    chainId: 1,
    address: address,
  });

  const onOpenModal = useCallback(() => {
    setConnectRole(role);
    onOpen();
  }, [setConnectRole, role, onOpen]);

  if (!children) return null;

  const isConnecting = [routes.CONNECTORS, routes.CONNECTING].includes(router.route) && isOpen;

  return (
    <>
      {children({
        show: isConnected ? onOpenProfile : onOpenModal,
        hide: onClose,
        chain: chain,
        unsupported: !!chain?.unsupported,
        isConnected: !!address,
        isConnecting: isConnecting, // Using `open` to determine if connecting as wagmi isConnecting only is set to true when an active connector is awaiting connection
        address: address,
        truncatedAddress: address ? truncateAddress(address) : undefined,
        ensName: ensName?.toString(),
      })}
    </>
  );
}
