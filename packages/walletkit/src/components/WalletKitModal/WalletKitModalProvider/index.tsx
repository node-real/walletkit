import { useDisclosure } from '@/base/hooks/useDisclosure';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { WalletKitModalContext, WalletKitModalOpenOptions } from './context';
import { useWalletKitContext } from '@/components/WalletKitProvider/context';
import { useRouter } from '@/components/RouteProvider/context';
import { routes } from '@/components/RouteProvider';
import { useAccount } from 'wagmi';
import { detectIOSRisk, IOS_RISK_POLICY_VERSION, type IOSRisk } from '../iosRisk';

function acknowledgementKey(risk: IOSRisk) {
  return `walletkit:ios-security:${IOS_RISK_POLICY_VERSION}:${risk.platform}:${risk.version}`;
}

export interface WalletKitModalProviderProps {
  children: React.ReactNode;
}

export function WalletKitModalProvider(props: WalletKitModalProviderProps) {
  const { children } = props;

  const { options, setAction } = useWalletKitContext();
  const { isConnected } = useAccount();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const router = useRouter();
  const [iosRisk, setIOSRisk] = useState<IOSRisk | null>();
  const acknowledged = useRef<string>();

  const checkIOSRisk = useCallback(() => {
    let risk =
      options.iosSecurityWarning !== false && typeof window !== 'undefined'
        ? detectIOSRisk(window.navigator.userAgent)
        : null;

    if (risk) {
      const key = acknowledgementKey(risk);
      try {
        if (window.sessionStorage.getItem(key) === '1') acknowledged.current = key;
      } catch {
        // Keep using the acknowledgement held by this provider if storage is blocked.
      }
      if (acknowledged.current === key) risk = null;
    }

    setIOSRisk(risk);
  }, [options.iosSecurityWarning]);

  useEffect(checkIOSRisk, [checkIOSRisk]);

  const value = useMemo(() => {
    return {
      isOpen,
      iosRisk: options.iosSecurityWarning === false ? null : iosRisk,
      checkIOSRisk,
      acknowledgeIOSRisk() {
        if (!iosRisk) return;
        const key = acknowledgementKey(iosRisk);
        acknowledged.current = key;
        try {
          window.sessionStorage.setItem(key, '1');
        } catch {
          // The acknowledgement still applies for this provider instance.
        }
        setIOSRisk(null);
      },
      onClose() {
        onClose();
        setTimeout(() => {
          router.reset();
        }, 300);
      },
      onOpen(params: WalletKitModalOpenOptions = {}) {
        const route = params.route ?? routes.CONNECTORS;
        if (route === routes.CONNECTORS) checkIOSRisk();
        router.push(route);
        setAction(params.action);
        onOpen();
      },
    };
  }, [
    checkIOSRisk,
    iosRisk,
    isOpen,
    onClose,
    onOpen,
    options.iosSecurityWarning,
    router,
    setAction,
  ]);

  useEffect(() => {
    if (
      [routes.CONNECTING, routes.CONNECT_WITH_QRCODE].includes(router.route) &&
      isConnected &&
      options.closeModalAfterConnected
    ) {
      value?.onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, router.route, options.closeModalAfterConnected]);

  return <WalletKitModalContext.Provider value={value}>{children}</WalletKitModalContext.Provider>;
}
