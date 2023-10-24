import { Chain, useAccount, useNetwork } from 'wagmi';
import { useIsMounted } from '../../../hooks/useIsMounted';
import { useWalletKitContext } from '../../WalletKitProvider/context';
import { useOpenModal } from '../../../hooks/useOpenModal';

export interface ConnectButtonRendererProps {
  children?: (renderProps: {
    show?: () => void;
    hide?: () => void;
    chain?: Chain & {
      unsupported?: boolean;
    };
    unsupported: boolean;
    isConnected: boolean;
    isConnecting: boolean;
    address?: string;
  }) => React.ReactNode;
}

export function ConnectButtonRenderer(props: ConnectButtonRendererProps) {
  const { children } = props;

  const isMounted = useIsMounted();
  const { isOpen, onClose } = useWalletKitContext();
  const { onOpenModal } = useOpenModal();

  const { chain } = useNetwork();
  const { address } = useAccount();

  if (!children || !isMounted) return null;

  return (
    <>
      {children({
        show: onOpenModal,
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
