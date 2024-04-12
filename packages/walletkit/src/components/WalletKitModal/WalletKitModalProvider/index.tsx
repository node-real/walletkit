import { useDisclosure } from '@/base/hooks/useDisclosure';
import React, { useEffect, useMemo } from 'react';
import { WalletKitModalContext, WalletKitModalOpenOptions } from './context';
import { useWalletKitContext } from '@/components/WalletKitProvider/context';
import { useRouter } from '@/components/RouteProvider/context';
import { routes } from '@/components/RouteProvider';
import { useAccount } from 'wagmi';

export interface WalletKitModalProviderProps {
  children: React.ReactNode;
}

export function WalletKitModalProvider(props: WalletKitModalProviderProps) {
  const { children } = props;

  const { options } = useWalletKitContext();
  const { isConnected } = useAccount();
  const { setAction } = useWalletKitContext();
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
      onOpen(options: WalletKitModalOpenOptions = {}) {
        router.push(options.route ?? routes.CONNECTORS);
        setAction(options.action);
        onOpen();
      },
    };
  }, [isOpen, onClose, onOpen, router, setAction]);

  useEffect(() => {
    if (
      [routes.CONNECTING, routes.CONNECT_WITH_QRCODE].includes(router.route) &&
      isConnected &&
      options.closeModalAfterConnected
    ) {
      value?.onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, router.route, options.closeModalAfterConnected]);

  return <WalletKitModalContext.Provider value={value}>{children}</WalletKitModalContext.Provider>;
}
