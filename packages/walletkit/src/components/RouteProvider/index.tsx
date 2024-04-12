import { useState, useRef, useMemo, useCallback } from 'react';
import { RouteContext } from './context';
import { Connecting } from '../WalletKitModal/Connecting';
import { Connectors } from '../WalletKitModal/Connectors';
import { ConnectWithQRCode } from '../WalletKitModal/ConnectWithQRCode';

export const routes = {
  CONNECTING: 'Connecting',
  CONNECTORS: 'Connectors',
  CONNECT_WITH_QRCODE: 'ConnectWithQRCode',
};

export interface RouteProviderProps {
  children: React.ReactNode;
}

export function RouteProvider(props: RouteProviderProps) {
  const { children } = props;

  const [route, setRoute] = useState('');
  const { current: history } = useRef<string[]>([]);

  const page = useMemo(() => {
    switch (route) {
      case routes.CONNECTING:
        return <Connecting />;
      case routes.CONNECTORS:
        return <Connectors />;
      case routes.CONNECT_WITH_QRCODE:
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
      page,
      back,
      push,
      replace,
      reset,
      history,
    };
  }, [back, history, page, push, replace, reset, route]);

  return <RouteContext.Provider value={value}>{children}</RouteContext.Provider>;
}
