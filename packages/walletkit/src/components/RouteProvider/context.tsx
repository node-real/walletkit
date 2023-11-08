import React, { useContext } from 'react';

export interface RouteContextProps {
  route: string;
  page: React.ReactNode;
  back: () => void;
  replace: (nextRoute: string) => void;
  push: (nextRoute: string) => void;
  reset: () => void;
}

export const RouteContext = React.createContext({} as RouteContextProps);

export function useRouter() {
  const context = useContext(RouteContext);
  return context;
}
