import { useCallback } from 'react';
import { useWalletKitContext } from '../components/WalletKitProvider/context';
import { useRouter } from '../components/RouteProvider/context';
import { routes } from '../components/RouteProvider';

export function useOpenModal() {
  const { onOpen } = useWalletKitContext();
  const router = useRouter();

  const onOpenModal = useCallback(() => {
    router.push(routes.CONNECTORS);
    onOpen();
  }, [onOpen, router]);

  return {
    onOpenModal,
  };
}
