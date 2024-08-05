import { useUIProviderConfig } from '@/ui-data/useUIProviderConfig';
import { toast } from '@/ui/base/components/toast';
import { useDisclosure } from '@/ui/base/hooks/useDisclosure';
import { useMemo } from 'react';
import { ProfileModalContext } from './context';

export interface ProfileModalProviderProps {
  children: React.ReactNode;
}

export function ProfileModalProvider(props: ProfileModalProviderProps) {
  const { children } = props;

  const { isConnected } = useUIProviderConfig();

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
