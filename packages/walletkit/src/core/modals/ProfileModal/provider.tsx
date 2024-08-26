import { useMemo } from 'react';
import { ProfileModalContext } from './context';
import { useDisclosure } from '@/core/base/hooks/useDisclosure';

export interface ProfileModalProviderProps {
  children: React.ReactNode;
}

export function ProfileModalProvider(props: ProfileModalProviderProps) {
  const { children } = props;

  const { isOpen, onClose, onOpen } = useDisclosure();

  const value = useMemo(() => {
    return {
      isOpen,
      onClose,
      onOpen,
    };
  }, [isOpen, onClose, onOpen]);

  return <ProfileModalContext.Provider value={value}>{children}</ProfileModalContext.Provider>;
}
