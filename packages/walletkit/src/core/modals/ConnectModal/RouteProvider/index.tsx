import { useState, useRef, useMemo, useCallback } from 'react';
import { RouteContext } from './context';
import { EvmConnectingView } from '@/evm/components/EvmConnectingView';
import { EvmQRCodeView } from '@/evm/components/EvmQRCodeView';
import { EvmWalletConnectURIConnectingView } from '@/evm/components/EvmWalletConnectURIConnectingView';
import { SolanaConnectingView } from '@/solana/components/SolanaConnectingView';
import { SolanaQRCodeView } from '@/solana/components/SolanaQRCodeView';
import { HomeView } from '../HomeView';
import { EvmMetaMaskURIConnectingView } from '@/evm/components/EvmMetaMaskURIConnectingView';

export enum ViewRoutes {
  HOME = 'HOME',
  EVM_CONNECTING = 'EVM_CONNECTING',
  EVM_QRCODE = 'EVM_QRCODE',
  EVM_WALLET_CONNECT_URI_CONNECTING = 'EVM_WALLET_CONNECT_URI_CONNECTING',
  EVM_META_MASK_URI_CONNECTING = 'EVM_META_MASK_URI_CONNECTING',
  SOLANA_CONNECTING = 'SOLANA_CONNECTING',
  SOLANA_QRCODE = 'SOLANA_QRCODE',
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
      case ViewRoutes.EVM_WALLET_CONNECT_URI_CONNECTING:
        return <EvmWalletConnectURIConnectingView />;
      case ViewRoutes.EVM_META_MASK_URI_CONNECTING:
        return <EvmMetaMaskURIConnectingView />;
      case ViewRoutes.SOLANA_CONNECTING:
        return <SolanaConnectingView />;
      case ViewRoutes.SOLANA_QRCODE:
        return <SolanaQRCodeView />;
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
