import { useDisclosure } from '@/core/base/hooks/useDisclosure';
import { useWalletKit } from '@/core/providers/WalletKitProvider/context';
import { useEffect, useMemo, useState } from 'react';
import { useAccount, useChains } from 'wagmi';
import { SwitchNetworkModalContext, SwitchNetworkModalOpenOptions } from './context';
import { toast } from '@/core/base/components/toast';

export interface SwitchNetworkProviderProps {
  children: React.ReactNode;
}

export function SwitchNetworkProvider(props: SwitchNetworkProviderProps) {
  const { children } = props;

  const [isClosable, setIsClosable] = useState(true);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { isConnected, chain } = useAccount();
  const chains = useChains();
  const { options } = useWalletKit();

  const isSupported = chains?.find((e) => e.id === chain?.id);

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
    if (isConnected && !isSupported) {
      setIsClosable(true);
    }
  }, [isSupported, isConnected]);

  return (
    <SwitchNetworkModalContext.Provider value={value}>
      {children}
    </SwitchNetworkModalContext.Provider>
  );
}
