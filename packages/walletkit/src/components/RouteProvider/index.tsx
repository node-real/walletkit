import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAccount } from 'wagmi';
import { RouteContext } from './context';
import { useWalletKitContext } from '../WalletKitProvider/context';
import { ConnectorsPage } from '../../pages/Connectors';
import { ConnectingPage } from '../../pages/Connecting';
import { ConnectWithQRCodePage } from '../../pages/ConnectWithQRCode';
import { ConnectedPage } from '../../pages/Connected';

export const routes = {
  CONNECTING: 'Connecting',
  CONNECTORS: 'Connectors',
  CONNECT_WITH_QRCODE: 'ConnectWithQRCode',
  CONNECTED: 'Connected',
};

export interface RouteProviderProps {
  children: React.ReactNode;
}

export function RouteProvider(props: RouteProviderProps) {
  const { children } = props;

  const { onClose } = useWalletKitContext();
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

  const value = useMemo(() => {
    return {
      route,
      page,
      back,
      push,
      replace,
    };
  }, [back, page, push, replace, route]);

  const { isConnected } = useAccount();

  useEffect(() => {
    if (isConnected) {
      onClose();
    }
  }, [isConnected, onClose]);

  return <RouteContext.Provider value={value}>{children}</RouteContext.Provider>;
}
