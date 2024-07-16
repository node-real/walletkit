import { useDisclosure } from '@/base/hooks/useDisclosure';
import React, { useEffect, useMemo, useState } from 'react';
import { SwitchNetworkModalContext, SwitchNetworkModalOpenOptions } from './context';
import { toast } from '@/base/components/toast';
import { useWalletKit } from '@/components/WalletKitProvider/context';
import { useChainIsSupported } from '@/hooks/useChainIsSupported';
import { useIsConnected } from '@/hooks/useIsConnected';

export interface SwitchNetworkModalProviderProps {
  children: React.ReactNode;
}

export function SwitchNetworkModalProvider(props: SwitchNetworkModalProviderProps) {
  const { children } = props;

  const [isClosable, setIsClosable] = useState(true);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { options } = useWalletKit();
  const isSupported = useChainIsSupported();
  const isConnected = useIsConnected();

  const value = useMemo(() => {
    return {
      isClosable,
      isOpen,
      onClose() {
        onClose();
        setTimeout(() => {
          setIsClosable(true);
        }, 300);
      },
      onOpen(options?: SwitchNetworkModalOpenOptions) {
        const { isClosable = true } = options ?? {};
        if (isConnected) {
          setIsClosable(isClosable);
          onOpen();
        } else {
          toast.info({
            description: 'Please connect a wallet first.',
          });
        }
      },
    };
  }, [isClosable, isConnected, isOpen, onClose, onOpen]);

  useEffect(() => {
    if (isConnected && options.openModalOnWrongNetwork) {
      const timer = setTimeout(() => {
        if (!isSupported) {
          value.onOpen({
            isClosable: false,
          });
        }
      }, 300);

      return () => {
        clearTimeout(timer);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSupported, isConnected]);

  useEffect(() => {
    if (isConnected && isSupported) {
      setIsClosable(true);
    }
  }, [isConnected, isSupported]);

  return (
    <SwitchNetworkModalContext.Provider value={value}>
      {children}
    </SwitchNetworkModalContext.Provider>
  );
}
