import {
  useAction,
  useInitialChainId,
  useWalletConfig,
} from '@/core/providers/WalletKitProvider/context';
import { RouteProvider, ViewRoutes } from './RouteProvider';
import { useMemo } from 'react';
import { ConnectModalContext, ConnectModalOpenParams } from './context';
import { useDisclosure } from '@/core/base/hooks/useDisclosure';
import { useRouter } from './RouteProvider/context';

export interface ConnectModalProviderProps {
  children: React.ReactNode;
}

export function ConnectModalProvider(props: ConnectModalProviderProps) {
  const { children } = props;

  return (
    <RouteProvider>
      <WithRouter>{children}</WithRouter>
    </RouteProvider>
  );
}

function WithRouter(props: ConnectModalProviderProps) {
  const { children } = props;

  const { evmConfig } = useWalletConfig();
  const { setAction } = useAction();
  const { setInitialChainId } = useInitialChainId();

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
        router.push(params.viewRoute ?? ViewRoutes.CONNECTORS);

        setAction(params.action);
        setInitialChainId(params.initialChainId ?? evmConfig?.initialChainId);

        onOpen();
      },
    };
  }, [evmConfig?.initialChainId, isOpen, onClose, onOpen, router, setAction, setInitialChainId]);

  return <ConnectModalContext.Provider value={value}>{children}</ConnectModalContext.Provider>;
}
