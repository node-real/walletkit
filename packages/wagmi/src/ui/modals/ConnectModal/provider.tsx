import { useDisclosure } from '@/ui/base/hooks/useDisclosure';
import { useMemo, useEffect } from 'react';
import { ConnectModalOpenParams, ConnectModalContext } from './context';
import { RouteProvider, ViewRoutes } from './RouteProvider';
import { useRouter } from './RouteProvider/context';
import { useWalletKit } from '@/core/components/WalletKitProvider/context';
import { useUIProvider } from '@/ui-data/useUIProvider';

export interface ConnectModalProviderProps {
  children: React.ReactNode;
}

export function ConnectModalProvider(props: ConnectModalProviderProps) {
  return (
    <RouteProvider>
      <WithRouter {...props} />
    </RouteProvider>
  );
}

function WithRouter(props: ConnectModalProviderProps) {
  const { children } = props;

  const { options, setAction } = useWalletKit();
  const { isConnected } = useUIProvider();

  const { isOpen, onClose, onOpen } = useDisclosure();
  const router = useRouter();

  const value = useMemo(() => {
    return {
      isOpen,
      onClose() {
        onClose();
        setTimeout(() => {
          router.reset();
        }, 300);
      },
      onOpen(params: ConnectModalOpenParams = {}) {
        router.push(params.viewRoute ?? ViewRoutes.CONNECTORS);
        setAction?.(params.action);
        onOpen();
      },
    };
  }, [isOpen, onClose, onOpen, router, setAction]);

  useEffect(() => {
    if (router.route !== ViewRoutes.CONNECTORS && isConnected && options.closeModalAfterConnected) {
      value?.onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, router.route, options.closeModalAfterConnected]);

  return <ConnectModalContext.Provider value={value}>{children}</ConnectModalContext.Provider>;
}
