import { MODAL_AUTO_CLOSE_DELAY } from '@/constants/common';
import { useEffect, useState } from 'react';
import { useWalletKitConnect } from './useWalletKitConnect';
import { setGlobalData } from '@/globalData';
import { useWalletKit } from '@/components/WalletKitProvider/context';
import { useConnectModal } from '@/modals/ConnectModal/context';
import { useWalletConnectConnector } from './useWalletConnectConnector';

export function useWalletConnectModal() {
  const { connectAsync } = useWalletKitConnect();
  const connectModal = useConnectModal();
  const { log } = useWalletKit();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        connectModal.onClose();
      }, MODAL_AUTO_CLOSE_DELAY);

      return () => {
        clearTimeout(timer);
      };
    }

    setGlobalData({
      walletConnectModalIsOpen: isOpen,
    });
  }, [connectModal, isOpen]);

  const connector = useWalletConnectConnector();

  return {
    isOpen,
    onOpen: async () => {
      document.body.style.setProperty('--wcm-z-index', '2147483647');

      const provider: any = await connector?.getProvider();
      provider.rpc.showQrModal = true;

      if (connector) {
        setIsOpen(true);

        try {
          await connectAsync({ connector });
        } catch (err) {
          log('[open walletconnect modal]', err);
        }

        setIsOpen(false);
      }
    },
  };
}
