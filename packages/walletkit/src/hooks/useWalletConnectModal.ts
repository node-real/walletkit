import { useState } from 'react';
import { Connector } from 'wagmi';
import { useWalletKitContext } from '../components/WalletKitProvider/context';
import { isWalletConnectConnector } from '../wallets';
import { useWalletKitConnect } from './useWalletKitConnect';

export function useWalletConnectModal() {
  const { connectAsync, connectors } = useWalletKitConnect();
  const [isOpen, setIsOpen] = useState(false);

  const { log } = useWalletKitContext();

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

      setIsOpen(true);

      try {
        await connectAsync({ connector: clientConnector });
      } catch (err) {
        log('WalletConnect', err);
      }

      setIsOpen(false);
      document.head.removeChild(w3mcss);
    },
  };
}
