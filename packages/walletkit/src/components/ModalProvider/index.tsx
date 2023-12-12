import { toast } from '@/base/components/toast';
import { useDisclosure } from '@/base/hooks/useDisclosure';
import { useEffect, useMemo, useState } from 'react';
import { useAccount, useNetwork } from 'wagmi';
import { routes } from '../RouteProvider';
import { useRouter } from '../RouteProvider/context';
import { useWalletKitContext } from '../WalletKitProvider/context';
import { OpenSwitchNetworkOptions, ModalContext, OpenOptions } from './context';

export interface ModalProviderProps {
  children: React.ReactNode;
}

export function ModalProvider(props: ModalProviderProps) {
  const { children } = props;

  const [isClosable, setIsClosable] = useState(true);

  const { isOpen, onClose, onOpen } = useDisclosure();
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const router = useRouter();

  const { options, setAction } = useWalletKitContext();
  const { closeModalAfterConnected, closeModalOnEsc, closeModalOnOverlayClick } = options;

  useEffect(() => {
    if (router.route === routes.SWITCH_NETWORK && isConnected && !chain?.unsupported) {
      setIsClosable(true);
    }
  }, [chain?.unsupported, isConnected, router.route]);

  const value = useMemo(() => {
    return {
      isClosable,
      closeOnEsc: closeModalOnEsc,
      closeOnOverlayClick: closeModalOnOverlayClick,
      isOpen,
      onClose() {
        onClose();
        setTimeout(() => {
          setIsClosable(true);
          router.reset();
        }, 300);
      },
      onOpen(options?: OpenOptions) {
        setAction(options?.action);
        router.push(routes.CONNECTORS);
        onOpen();
      },
      onOpenProfile() {
        if (isConnected) {
          router.push(routes.CONNECTED);
          onOpen();
        } else {
          toast.info({
            description: 'Please connect a wallet first.',
          });
        }
      },
      onOpenSwitchNetwork(options?: OpenSwitchNetworkOptions) {
        const { isClosable = true } = options ?? {};

        if (isConnected) {
          router.push(routes.SWITCH_NETWORK);
          setIsClosable(isClosable);
          onOpen();
        } else {
          toast.info({
            description: 'Please connect a wallet first.',
          });
        }
      },
    };
  }, [
    closeModalOnEsc,
    closeModalOnOverlayClick,
    isClosable,
    isConnected,
    isOpen,
    onClose,
    onOpen,
    router,
    setAction,
  ]);

  useEffect(() => {
    if (
      [routes.CONNECTING, routes.CONNECT_WITH_QRCODE].includes(router.route) &&
      isConnected &&
      closeModalAfterConnected
    ) {
      onClose();
    }
  }, [isConnected, onClose, closeModalAfterConnected, router.route]);

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}
