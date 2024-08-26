import { useState, useRef, useMemo, useCallback } from 'react';
import { RouteContext } from './context';
import { EvmConnectingView } from '@/evm/components/EvmConnectingView';
import { EvmConnectWithQRCodeView } from '@/evm/components/EvmConnectWithQRCodeView';
import { EvmConnectWithWalletConnect } from '@/evm/components/EvmConnectWithWalletConnect';
import { SolanaConnectingView } from '@/solana/components/SolanaConnectingView';
import { SolanaConnectWithQRCodeView } from '@/solana/components/SolanaConnectWithQRCodeView';
import { ConnectorsView } from '../ConnectorsView';

export enum ViewRoutes {
  CONNECTORS = 'Connectors',
  EVM_CONNECTING = 'EvmConnecting',
  EVM_CONNECT_WITH_QRCODE = 'EvmConnectWithQRCode',
  EVM_CONNECT_WITH_WALLET_CONNECT = 'EvmConnectWithWalletConnect',
  SOLANA_CONNECTING = 'SolanaConnecting',
  SOLANA_CONNECT_WITH_QRCODE = 'SolanaConnectWithQRCode',
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
      case ViewRoutes.CONNECTORS:
        return <ConnectorsView />;
      case ViewRoutes.EVM_CONNECTING:
        return <EvmConnectingView />;
      case ViewRoutes.EVM_CONNECT_WITH_QRCODE:
        return <EvmConnectWithQRCodeView />;
      case ViewRoutes.EVM_CONNECT_WITH_WALLET_CONNECT:
        return <EvmConnectWithWalletConnect />;
      case ViewRoutes.SOLANA_CONNECTING:
        return <SolanaConnectingView />;
      case ViewRoutes.SOLANA_CONNECT_WITH_QRCODE:
        return <SolanaConnectWithQRCodeView />;
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
