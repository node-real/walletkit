import { useWalletKit } from '@/core/providers/WalletKitProvider/context';
import { ViewRoutes } from '../../providers/RouteProvider';
import { useMemo } from 'react';
import { ConnectModalContext, ConnectModalOpenParams } from './context';
import { useDisclosure } from '@/core/base/hooks/useDisclosure';
import { useRouter } from '../../providers/RouteProvider/context';

export interface ConnectModalProviderProps {
  children: React.ReactNode;
}

export function ConnectModalProvider(props: ConnectModalProviderProps) {
  const { children } = props;

  const { setAction, evmConfig, tronConfig, options } = useWalletKit();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const router = useRouter();

  const value = useMemo(() => {
    return {
      isOpen,
      onClose() {
        onClose();
        setTimeout(() => {
          router.reset();
        }, 300);
      },
      onOpen(params: ConnectModalOpenParams = {}) {
        router.push(params.viewRoute ?? ViewRoutes.HOME);
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
  }, [evmConfig, isOpen, onClose, onOpen, options, router, setAction, tronConfig]);

  return <ConnectModalContext.Provider value={value}>{children}</ConnectModalContext.Provider>;
}
