import { useDisclosure } from '@/base/hooks/useDisclosure';
import React, { useEffect, useMemo, useState } from 'react';
import { useAccount, useNetwork } from 'wagmi';
import { SwitchNetworkModalContext, SwitchNetworkModalOpenOptions } from './context';
import { toast } from '@/base/components/toast';

export interface SwitchNetworkProviderProps {
  children: React.ReactNode;
}

export function SwitchNetworkProvider(props: SwitchNetworkProviderProps) {
  const { children } = props;

  const [isClosable, setIsClosable] = useState(true);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { chain } = useNetwork();
  const { isConnected } = useAccount();

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
    if (isConnected) {
      const timer = setTimeout(() => {
        if (chain?.unsupported) {
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
  }, [chain?.unsupported, isConnected]);

  useEffect(() => {
    if (isConnected && !chain?.unsupported) {
      setIsClosable(true);
    }
  }, [chain?.unsupported, isConnected]);

  return (
    <SwitchNetworkModalContext.Provider value={value}>
      {children}
    </SwitchNetworkModalContext.Provider>
  );
}
