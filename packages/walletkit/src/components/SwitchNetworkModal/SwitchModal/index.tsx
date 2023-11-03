import { useNetwork } from 'wagmi';
import { Box } from '../../../base/Box';
import { Modal, ModalProps } from '../../../base/Modal';
import { ModalBody } from '../../../base/Modal/ModalBody';
import { ModalHeader } from '../../../base/Modal/ModalHeader';
import { useIsMounted } from '../../../hooks/useIsMounted';
import { useWalletKitSwitchNetwork } from '../../../hooks/useWalletKitSwitchNetwork';
import { cx } from '../../../utils/css';
import { DisconnectButton } from '../../DisconnectButton';
import { Navbar } from '../../Navbar';
import { useWalletKitContext } from '../../WalletKitProvider/context';
import { ChainOption } from '../ChainOption';
import { clsChains, clsDescription, clsOrSeparator } from './styles.css';

export interface SwitchModalProps extends ModalProps {
  isClosable?: boolean;
}

export function SwitchModal(props: SwitchModalProps) {
  const { className, isOpen, onClose, isClosable = false, ...restProps } = props;

  const isMounted = useIsMounted();

  const { supportedChains } = useWalletKitContext();
  const { isLoading, switchNetwork, pendingChainId } = useWalletKitSwitchNetwork();
  const { chain } = useNetwork();

  const onSwitchNetwork = (chainId: number) => {
    if (switchNetwork && !isLoading) {
      switchNetwork(chainId);
    }
  };

  if (!isMounted) return null;

  return (
    <Modal
      className={cx('wk-switch-network-modal', className)}
      isOpen={isOpen}
      onClose={onClose}
      closeOnEsc={false}
      closeOnOverlayClick={false}
      {...restProps}
    >
      {isClosable && <Navbar onClose={onClose} />}
      <ModalHeader>Switch Network</ModalHeader>

      <ModalBody>
        {chain?.unsupported && (
          <Box className={clsDescription}>
            This app does not support the current connected network. Switch or disconnect to
            continue.
          </Box>
        )}
        <Box className={cx('wk-chains', clsChains)}>
          {supportedChains?.map((item) => {
            return (
              <ChainOption
                key={item.id}
                data={item}
                isLoading={isLoading && pendingChainId === item.id}
                isConnected={item.id === chain?.id}
                onClick={() => onSwitchNetwork(item.id)}
              />
            );
          })}
        </Box>

        <Box className={clsOrSeparator}>or</Box>

        <DisconnectButton />
      </ModalBody>
    </Modal>
  );
}
