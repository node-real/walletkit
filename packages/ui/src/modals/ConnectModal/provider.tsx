import { useDisclosure } from '@/base/hooks/useDisclosure';
import React, { useEffect, useMemo } from 'react';
import { ConnectModalContext, ConnectModalOpenParams } from './context';
import { useRouter } from '@/modals/ConnectModal/RouteProvider/context';
import { RouteProvider, routes } from '@/modals/ConnectModal/RouteProvider';
import { useDataSource } from '@/components/DataSourceProvider/context';

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

  const { options, setAction, useProvider } = useDataSource();
  const { isConnected } = useProvider();

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
        router.push(params.route ?? routes.CONNECTORS);
        setAction?.(params.action);
        onOpen();
      },
    };
  }, [isOpen, onClose, onOpen, router, setAction]);

  useEffect(() => {
    if (router.route !== routes.CONNECTORS && isConnected && options.closeModalAfterConnected) {
      value?.onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, router.route, options.closeModalAfterConnected]);

  return <ConnectModalContext.Provider value={value}>{children}</ConnectModalContext.Provider>;
}