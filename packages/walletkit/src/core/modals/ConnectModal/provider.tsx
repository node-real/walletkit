import { useWalletKit } from '@/core/providers/WalletKitProvider/context';
import { ViewRoutes } from '../../providers/RouteProvider';
import { useMemo, useRef, useState } from 'react';
import { ConnectModalContext, ConnectModalOpenParams } from './context';
import { useDisclosure } from '@/core/base/hooks/useDisclosure';
import { useRouter } from '../../providers/RouteProvider/context';
import { detectIOSRisk, IOS_RISK_POLICY_VERSION, type IOSRisk } from './iosRisk';

function acknowledgementKey(risk: IOSRisk) {
  return `walletkit:ios-security:${IOS_RISK_POLICY_VERSION}:${risk.platform}:${risk.version}`;
}

export interface ConnectModalProviderProps {
  children: React.ReactNode;
}

export function ConnectModalProvider(props: ConnectModalProviderProps) {
  const { children } = props;

  const { setAction, evmConfig, tronConfig, options } = useWalletKit();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const router = useRouter();
  const [iosRisk, setIOSRisk] = useState<IOSRisk | null>(null);
  const acknowledged = useRef(new Set<string>());

  const value = useMemo(() => {
    return {
      isOpen,
      iosRisk: options.iosSecurityWarning === false ? null : iosRisk,
      acknowledgeIOSRisk() {
        if (!iosRisk) return;
        const key = acknowledgementKey(iosRisk);
        acknowledged.current.add(key);
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
      onOpen(params: ConnectModalOpenParams = {}) {
        const route = params.viewRoute ?? ViewRoutes.HOME;
        if (route === ViewRoutes.HOME) {
          let risk =
            options.iosSecurityWarning !== false && typeof navigator !== 'undefined'
              ? detectIOSRisk(navigator.userAgent)
              : null;
          if (risk) {
            const key = acknowledgementKey(risk);
            try {
              if (window.sessionStorage.getItem(key) === '1') acknowledged.current.add(key);
            } catch {
              // A blocked storage API must not stop the wallet selection flow.
            }
            if (acknowledged.current.has(key)) risk = null;
          }
          setIOSRisk(risk);
        }

        router.push(route);
        setAction(params.action);

        // TODO
        if (evmConfig && params.initialChainId) {
          evmConfig.initialChainId = params.initialChainId;
        }
        if (evmConfig && params.evmConfig?.initialChainId) {
          evmConfig.initialChainId = params.evmConfig.initialChainId;
        }
        if (tronConfig && params.tronConfig?.initialChainId) {
          tronConfig.initialChainId = params.tronConfig.initialChainId;
        }

        if (params.onConnected) {
          options.onConnected = params.onConnected;
        }

        onOpen();
      },
    };
  }, [evmConfig, iosRisk, isOpen, onClose, onOpen, options, router, setAction, tronConfig]);

  return <ConnectModalContext.Provider value={value}>{children}</ConnectModalContext.Provider>;
}
