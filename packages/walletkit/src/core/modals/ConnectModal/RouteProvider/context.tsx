import React, { useContext } from 'react';

export interface RouteContextProps {
  route: string;
  view: React.ReactNode;
  history: string[];
  back: () => void;
  replace: (nextRoute: string) => void;
  push: (nextRoute: string) => void;
  reset: () => void;
}

export const RouteContext = React.createContext({} as RouteContextProps);

export function useRouter() {
  return useContext(RouteContext);
}
