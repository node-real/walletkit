import { useState, useRef, useMemo, useCallback } from 'react';
import { RouteContext } from './context';
import { Connecting } from '../Connecting';
import { Connectors } from '../Connectors';
import { ConnectWithQRCode } from '../ConnectWithQRCode';

export enum ViewRoutes {
  CONNECTING = 'Connecting',
  CONNECTORS = 'Connectors',
  CONNECT_WITH_QRCODE = 'ConnectWithQRCode',
}

export interface RouteProviderProps {
  children: React.ReactNode;
}

export function RouteProvider(props: RouteProviderProps) {
  const { children } = props;

  const [route, setRoute] = useState('');
  const { current: history } = useRef<string[]>([]);

  const view = useMemo(() => {
    switch (route) {
      case ViewRoutes.CONNECTING:
        return <Connecting />;
      case ViewRoutes.CONNECTORS:
        return <Connectors />;
      case ViewRoutes.CONNECT_WITH_QRCODE:
        return <ConnectWithQRCode />;
    }
    return null;
  }, [route]);

  const back = useCallback(() => {
    history.pop();
    const nextRoute = history[history.length - 1];
    if (nextRoute) {
      setRoute(nextRoute);
    }
  }, [history]);

  const push = useCallback(
    (nextRoute: string) => {
      if (history[history.length - 1] !== nextRoute) {
        history.push(nextRoute);
        setRoute(nextRoute);
      }
    },
    [history],
  );

  const replace = useCallback(
    (nextRoute: string) => {
      if (history[history.length - 1] !== nextRoute) {
        history[history.length - 1] = nextRoute;
        setRoute(nextRoute);
      }
    },
    [history],
  );

  const reset = useCallback(() => {
    history.length = 0;
  }, [history]);

  const value = useMemo(() => {
    return {
      route,
      view,
      back,
      push,
      replace,
      reset,
      history,
    };
  }, [back, history, view, push, replace, reset, route]);

  return <RouteContext.Provider value={value}>{children}</RouteContext.Provider>;
}
