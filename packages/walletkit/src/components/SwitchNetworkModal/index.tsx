import { useAccount, useNetwork } from 'wagmi';
import { useEffect } from 'react';
import { useModal } from '../ModalProvider/context';

export function SwitchNetworkModal() {
  const { onOpenSwitchNetwork } = useModal();
  const { chain } = useNetwork();
  const { isConnected } = useAccount();

  useEffect(() => {
    if (isConnected) {
      const timer = setTimeout(() => {
        if (chain?.unsupported) {
          onOpenSwitchNetwork({ isClosable: false });
        }
      }, 300);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [chain?.unsupported, isConnected, onOpenSwitchNetwork]);

  return null;
}
