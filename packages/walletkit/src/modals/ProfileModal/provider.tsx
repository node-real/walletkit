import { useDisclosure } from '@/base/hooks/useDisclosure';
import React, { useMemo } from 'react';
import { ProfileModalContext } from './context';
import { toast } from '@/base/components/toast';
import { useIsConnected } from '@/hooks/useIsConnected';

export interface ProfileModalProviderProps {
  children: React.ReactNode;
}

export function ProfileModalProvider(props: ProfileModalProviderProps) {
  const { children } = props;

  const isConnected = useIsConnected();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const value = useMemo(() => {
    return {
      isOpen,
      onClose,
      onOpen() {
        if (isConnected) {
          onOpen();
        } else {
          toast.info({
            description: 'Please connect a wallet first.',
          });
        }
      },
    };
  }, [isConnected, isOpen, onClose, onOpen]);

  return <ProfileModalContext.Provider value={value}>{children}</ProfileModalContext.Provider>;
}
