import { Box } from '@/base/components/Box';
import { ModalBody } from '@/base/components/Modal/ModalBody';
import { ModalHeader } from '@/base/components/Modal/ModalHeader';
import { DisconnectButton } from '@/components/DisconnectButton';
import { Navbar } from '@/components/Navbar';
import { cx } from '@/index';
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
import { useSwitchNetworkModal } from './context';
import { useWalletKit } from '@/components/WalletKitProvider/context';
import { useAccount } from 'wagmi';
import { useWalletKitSwitchChain } from '@/hooks/useWalletKitSwitchChain';
import { useChainIsSupported } from '@/hooks/useChainIsSupported';
import { useState } from 'react';

export function SwitchNetworkModal() {
  const { chain } = useAccount();
  const isSupported = useChainIsSupported();
  const { isClosable, isOpen, onClose } = useSwitchNetworkModal();
  const { chainsConfig, log, options } = useWalletKit();

  const [targetChainId, setTargetChainId] = useState<number>();

  const { switchChain, isPending } = useWalletKitSwitchChain({
    mutation: {
      onSuccess() {
        if (options.closeModalAfterSwitchingNetwork) {
          onClose();
        }
      },
    },
  });

  const onSwitchChain = (chainId: number) => {
    log('[switch network]', 'switchChain:', switchChain, ', isPending:', isPending);

    if (switchChain && !isPending) {
      setTargetChainId(chainId);

      switchChain({
        chainId,
      });
    }
  };

  return (
    <Modal
      className="wk-switch-network-modal"
      isOpen={isOpen}
      onClose={onClose}
      closeOnEsc={isClosable ? options.closeModalOnEsc : false}
      closeOnOverlayClick={isClosable ? options.closeModalOnOverlayClick : false}
    >
      {isClosable && <Navbar onClose={onClose} />}
      <ModalHeader className={isClosable ? undefined : clsNoNavHeader}>Switch Network</ModalHeader>

      <ModalBody className={clsBody}>
        {!isSupported && (
          <Box className={clsDescription}>
            This app does not support the current connected network. Switch or disconnect to
            continue.
          </Box>
        )}
        <Box className={cx('wk-chains', clsChains)}>
          {chainsConfig?.map((item) => {
            return (
              <ChainOption
                key={item.id}
                data={item}
                isLoading={isPending && item.id === targetChainId}
                isConnected={item.id === chain?.id}
                onClick={() => onSwitchChain(item.id)}
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
