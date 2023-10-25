import { Chain, useAccount, useNetwork } from 'wagmi';
import { useIsMounted } from '../../../hooks/useIsMounted';
import { ConnectVariant, useWalletKitContext } from '../../WalletKitProvider/context';
import { useOpenModal } from '../../../hooks/useOpenModal';
import { useCallback } from 'react';

export interface ConnectButtonRendererProps {
  variant?: ConnectVariant;

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
  }) => React.ReactNode;
}

export function ConnectButtonRenderer(props: ConnectButtonRendererProps) {
  const { variant = 'default', children } = props;

  const isMounted = useIsMounted();
  const { isOpen, onClose, setConnectVariant } = useWalletKitContext();
  const { onOpenModal } = useOpenModal();

  const { chain } = useNetwork();
  const { address } = useAccount();

  const onOpen = useCallback(() => {
    setConnectVariant(variant);
    onOpenModal();
  }, [onOpenModal, setConnectVariant, variant]);

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
