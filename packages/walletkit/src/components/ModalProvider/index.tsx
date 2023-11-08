import { useEffect, useMemo, useState } from 'react';
import { useDisclosure } from '../../base/hooks/useDisclosure';
import { ModalContext, OpenSwitchNetworkOptions } from './context';
import { useRouter } from '../RouteProvider/context';
import { useAccount, useNetwork } from 'wagmi';
import { routes } from '../RouteProvider';
import { toast } from '../../base/components/toast';

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

  useEffect(() => {
    if (router.route === routes.SWITCH_NETWORK && isConnected && !chain?.unsupported) {
      setIsClosable(true);
    }
  }, [chain?.unsupported, isConnected, router.route]);

  const value = useMemo(() => {
    return {
      isClosable,
      isOpen,
      onClose() {
        router.reset();
        setIsClosable(true);
        onClose();
      },
      onOpen() {
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
      onOpenSwitchNetwork(options: OpenSwitchNetworkOptions = {}) {
        const { isClosable = true } = options;

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
  }, [isClosable, isConnected, isOpen, onClose, onOpen, router]);

  useEffect(() => {
    if ([routes.CONNECTING, routes.CONNECT_WITH_QRCODE].includes(router.route) && isConnected) {
      onClose();
    }
  }, [isConnected, onClose, router.route]);

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}
