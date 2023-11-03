import { useAccount, useNetwork } from 'wagmi';
import { useEffect } from 'react';
import { useWalletKitContext } from '../WalletKitProvider/context';
import { BoxProps } from '../../base/Box';
import { useDisclosure } from '../../hooks/useDisclosure';
import { useIsMounted } from '../../hooks/useIsMounted';
import { SwitchModal } from './SwitchModal';

export type SwitchNetworkModalProps = BoxProps;

export function SwitchNetworkModal(props: SwitchNetworkModalProps) {
  const { ...restProps } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMounted = useIsMounted();

  const { chain } = useNetwork();
  const { isConnected } = useAccount();

  const { onClose: onCloseWalletKitModal } = useWalletKitContext();

  useEffect(() => {
    if (isConnected) {
      const timer = setTimeout(() => {
        if (chain?.unsupported) {
          onCloseWalletKitModal();
          onOpen();
        } else {
          onClose();
        }
      }, 300);

      return () => {
        clearTimeout(timer);
      };
    } else {
      onClose();
    }
  }, [chain?.unsupported, isConnected, onClose, onCloseWalletKitModal, onOpen]);

  if (!isMounted) return null;

  return <SwitchModal isOpen={isOpen} onClose={onClose} {...restProps} />;
}
