import { ConnectWithQRCodePage } from '@/pages/ConnectWithQRCode';
import { ConnectedPage } from '@/pages/Connected';
import { ConnectingPage } from '@/pages/Connecting';
import { ConnectorsPage } from '@/pages/Connectors';
import { SwitchNetworkPage } from '@/pages/SwitchNetwork';
import { useState, useRef, useMemo, useCallback } from 'react';
import { RouteContext } from './context';

export const routes = {
  CONNECTING: 'Connecting',
  CONNECTORS: 'Connectors',
  CONNECT_WITH_QRCODE: 'ConnectWithQRCode',
  CONNECTED: 'Connected',
  SWITCH_NETWORK: 'SwitchNetwork',
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
        return <ConnectingPage />;
      case routes.CONNECTORS:
        return <ConnectorsPage />;
      case routes.CONNECT_WITH_QRCODE:
        return <ConnectWithQRCodePage />;
      case routes.CONNECTED:
        return <ConnectedPage />;
      case routes.SWITCH_NETWORK:
        return <SwitchNetworkPage />;
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
    };
  }, [back, page, push, replace, reset, route]);

  return <RouteContext.Provider value={value}>{children}</RouteContext.Provider>;
}
