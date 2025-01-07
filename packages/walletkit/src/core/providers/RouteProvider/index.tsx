import { useState, useRef, useMemo, useCallback } from 'react';
import { RouteContext } from './context';
import { EvmConnectingView } from '@/evm/components/EvmConnectingView';
import { EvmQRCodeView } from '@/evm/components/EvmQRCodeView';
import { EvmUriConnectingView } from '@/evm/components/EvmUriConnectingView';
import { SolanaConnectingView } from '@/solana/components/SolanaConnectingView';
import { SolanaQRCodeView } from '@/solana/components/SolanaQRCodeView';
import { HomeView } from '../../modals/ConnectModal/HomeView';
import { TronConnectingView } from '@/tron/components/TronConnectingView';

export enum ViewRoutes {
  HOME = 'HOME',
  EVM_CONNECTING = 'EVM_CONNECTING',
  EVM_QRCODE = 'EVM_QRCODE',
  EVM_URI_CONNECTING = 'EVM_URI_CONNECTING',
  SOLANA_CONNECTING = 'SOLANA_CONNECTING',
  SOLANA_QRCODE = 'SOLANA_QRCODE',
  TRON_CONNECTING = 'TRON_CONNECTING',
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
      case ViewRoutes.HOME:
        return <HomeView />;
      case ViewRoutes.EVM_CONNECTING:
        return <EvmConnectingView />;
      case ViewRoutes.EVM_QRCODE:
        return <EvmQRCodeView />;
      case ViewRoutes.EVM_URI_CONNECTING:
        return <EvmUriConnectingView />;
      case ViewRoutes.SOLANA_CONNECTING:
        return <SolanaConnectingView />;
      case ViewRoutes.SOLANA_QRCODE:
        return <SolanaQRCodeView />;
      case ViewRoutes.TRON_CONNECTING:
        return <TronConnectingView />;
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
      if (nextRoute === ViewRoutes.HOME) {
        reset();
      }
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
