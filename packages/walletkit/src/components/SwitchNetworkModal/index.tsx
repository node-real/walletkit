import { Box } from '@/base/components/Box';
import { ModalBody } from '@/base/components/Modal/ModalBody';
import { ModalHeader } from '@/base/components/Modal/ModalHeader';
import { DisconnectButton } from '@/components/DisconnectButton';
import { Navbar } from '@/components/Navbar';
import { useWalletKitSwitchNetwork } from '@/hooks/useWalletKitSwitchNetwork';
import { cx } from '@/index';
import { useNetwork } from 'wagmi';
import { ChainOption } from './ChainOption';
import {
  clsDescription,
  clsChains,
  clsOrSeparator,
  clsBody,
  clsFooter,
  clsNoNavHeader,
} from './styles.css';
import { ModalFooter } from '@/base/components/Modal/ModalFooter';
import { Modal } from '@/base/components/Modal';
import { useSwitchNetworkModal } from './SwitchNetworkProvider/context';
import { useWalletKitContext } from '../WalletKitProvider/context';

export function SwitchNetworkModal() {
  const { chain } = useNetwork();
  const { isClosable, isOpen, onClose } = useSwitchNetworkModal();
  const { supportedChains, log, options } = useWalletKitContext();

  const { isLoading, switchNetwork, pendingChainId } = useWalletKitSwitchNetwork({
    onSuccess() {
      if (options.closeModalAfterSwitchingNetwork) {
        onClose();
      }
    },
  });

  const onSwitchNetwork = (chainId: number) => {
    log('[switch network page]', 'switchNetwork:', switchNetwork, ', isLoading:', isLoading);

    if (switchNetwork && !isLoading) {
      switchNetwork(chainId);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnEsc={isClosable ? options.closeModalOnEsc : false}
      closeOnOverlayClick={isClosable ? options.closeModalOnOverlayClick : false}
    >
      {isClosable && <Navbar onClose={onClose} />}
      <ModalHeader className={isClosable ? undefined : clsNoNavHeader}>Switch Network</ModalHeader>

      <ModalBody className={clsBody}>
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
        <Box className={cx('wk-or-separator', clsOrSeparator)}>or</Box>
      </ModalBody>

      <ModalFooter className={clsFooter}>
        <DisconnectButton />
      </ModalFooter>
    </Modal>
  );
}
