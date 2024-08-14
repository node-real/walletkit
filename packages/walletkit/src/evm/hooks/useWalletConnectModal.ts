import { useState, useEffect } from 'react';
import { useWalletConnectConnector } from './useWalletConnectConnector';
import { useEvmConnect } from './useEvmConnect';
import { useConnectModal } from '@/core/modals/ConnectModal/context';
import { useLogger } from '@/core/providers/WalletKitProvider/context';
import { setGlobalData } from '@/core/globalData';

export function useWalletConnectModal() {
  const { connectAsync } = useEvmConnect();
  const connectModal = useConnectModal();
  const log = useLogger();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        connectModal.onClose();
      }, 800);

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
