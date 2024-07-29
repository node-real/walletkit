import { useDisclosure } from '@/base/hooks/useDisclosure';
import React, { useEffect, useMemo } from 'react';
import { ConnectModalContext, ConnectModalOpenOptions } from './context';
import { useWalletKit } from '@/components/WalletKitProvider/context';
import { useRouter } from '@/modals/ConnectModal/RouteProvider/context';
import { RouteProvider, routes } from '@/modals/ConnectModal/RouteProvider';
import { useIsConnected } from '@/hooks/useIsConnected';

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
  const { isOpen, onClose, onOpen } = useDisclosure();
  const isConnected = useIsConnected();
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
      onOpen(options: ConnectModalOpenOptions = {}) {
        router.push(options.route ?? routes.CONNECTORS);
        setAction(options.action);
        onOpen();
      },
    };
  }, [isOpen, onClose, onOpen, router, setAction]);

  useEffect(() => {
    console.log(
      'route: ',
      router.route,
      router.route !== routes.CONNECTORS,
      isConnected,
      options.closeModalAfterConnected,
    );
    if (router.route !== routes.CONNECTORS && isConnected && options.closeModalAfterConnected) {
      console.log('onClose: ', value?.onClose);
      value?.onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, router.route, options.closeModalAfterConnected]);

  return <ConnectModalContext.Provider value={value}>{children}</ConnectModalContext.Provider>;
}
