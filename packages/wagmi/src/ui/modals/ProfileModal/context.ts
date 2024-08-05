import React, { useContext } from 'react';

export interface ProfileModalContextProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const ProfileModalContext = React.createContext({} as ProfileModalContextProps);

export function useProfileModal() {
  return useContext(ProfileModalContext);
}
