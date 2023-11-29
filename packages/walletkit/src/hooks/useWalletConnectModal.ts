import { MODAL_AUTO_CLOSE_DELAY } from '@/constants/common';
import { useEffect, useState } from 'react';
import { useModal, useWalletKitContext } from '..';
import { useWalletKitConnect } from './useWalletKitConnect';
import { getGlobalData, setGlobalData } from '@/globalData';

export function useWalletConnectModal() {
  const { connectAsync } = useWalletKitConnect();
  const { onClose } = useModal();
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
          log('WalletConnect', err);
        }

        setIsOpen(false);
      }
    },
  };
}
