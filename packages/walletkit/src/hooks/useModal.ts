import { useCallback } from 'react';
import { useWalletKitContext } from '..';
import { routes } from '../components/RouteProvider';
import { useRouter } from '../components/RouteProvider/context';
import { useAccount } from 'wagmi';
import { toast } from '../base/toast';

export function useModal() {
  const { isOpen, onOpen, onClose } = useWalletKitContext();
  const router = useRouter();

  const { isConnected } = useAccount();

  const onOpenModal = useCallback(() => {
    router.push(routes.CONNECTORS);
    onOpen();
  }, [onOpen, router]);

  const onOpenProfile = useCallback(() => {
    if (isConnected) {
      router.push(routes.CONNECTED);
      onOpen();
    } else {
      toast.info({
        description: 'Please connect a wallet first.',
      });
    }
  }, [isConnected, onOpen, router]);

  return {
    isOpen,
    onClose,
    onOpen: onOpenModal,
    onOpenProfile,
  };
}
