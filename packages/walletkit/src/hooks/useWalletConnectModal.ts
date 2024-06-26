import { MODAL_AUTO_CLOSE_DELAY } from '@/constants/common';
import { useEffect, useState } from 'react';
import { useWalletKitConnect } from './useWalletKitConnect';
import { getGlobalData, setGlobalData } from '@/globalData';
import { useWalletKitModal } from '@/components/WalletKitModal/WalletKitModalProvider/context';
import { useWalletKitContext } from '@/components/WalletKitProvider/context';

export function useWalletConnectModal() {
  const { connectAsync } = useWalletKitConnect();
  const { onClose } = useWalletKitModal();
  const { log } = useWalletKitContext();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, MODAL_AUTO_CLOSE_DELAY);

      return () => {
        clearTimeout(timer);
      };
    }

    setGlobalData({
      walletConnectModalIsOpen: isOpen,
    });
  }, [isOpen, onClose]);

  return {
    isOpenWcModal: isOpen,
    onOpenWcModal: async () => {
      document.body.style.setProperty('--wcm-z-index', '2147483647');

      const connector = getGlobalData().walletConnectConnector;
      const provider = await connector?.getProvider();
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
