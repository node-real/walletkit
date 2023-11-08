import { useEffect, useState } from 'react';
import { Connector } from 'wagmi';
import { useWalletKitContext } from '../components/WalletKitProvider/context';
import { WalletConnectConnector, isWalletConnectConnector } from '../wallets';
import { useWalletKitConnect } from './useWalletKitConnect';
import { MODAL_AUTO_CLOSE_DELAY } from '../constants/common';
import { useModal } from '../components/ModalProvider/context';

export function useWalletConnectModal() {
  const { connectAsync, connectors } = useWalletKitConnect();
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
  }, [isOpen, onClose]);

  return {
    isOpenWcModal: isOpen,
    onOpenWcModal: async () => {
      const w3mcss = document.createElement('style');
      w3mcss.innerHTML = `#walletconnect-wrapper{z-index:2147483647;}`;
      document.head.appendChild(w3mcss);
      document.body.style.setProperty('--wcm-z-index', '2147483647');

      const clientConnector: Connector<any, any> | undefined = connectors.find((c) =>
        isWalletConnectConnector(c),
      );

      if (clientConnector) {
        const connector = new WalletConnectConnector({
          ...clientConnector,
          options: {
            ...clientConnector.options,
            showQrModal: true,
          },
        });

        setIsOpen(true);

        try {
          await connectAsync({ connector });
        } catch (err) {
          log('WalletConnect', err);
        }

        setIsOpen(false);
        document.head.removeChild(w3mcss);
      }
    },
  };
}
