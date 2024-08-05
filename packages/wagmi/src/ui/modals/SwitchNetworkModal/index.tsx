import { useWalletKit } from '@/core/components/WalletKitProvider/context';
import { useSwitchNetworkModal } from './context';
import { useUIChainInfo } from '@/ui-data/useUIChainInfo';
import { useUISwitchingConfig } from '@/ui-data/useUISwitchingConfig';
import { Box } from '@/ui/base/components/Box';
import { Modal } from '@/ui/base/components/Modal';
import { ModalBody } from '@/ui/base/components/Modal/ModalBody';
import { ModalFooter } from '@/ui/base/components/Modal/ModalFooter';
import { ModalHeader } from '@/ui/base/components/Modal/ModalHeader';
import { cx } from '@/ui/base/utils/css';
import { DisconnectButton } from '@/ui/components/DisconnectButton';
import { Navbar } from '@/ui/components/Navbar';
import { useState } from 'react';
import { ChainOption } from './ChainOption';
import {
  clsNoNavHeader,
  clsBody,
  clsDescription,
  clsChains,
  clsOrSeparator,
  clsFooter,
} from './styles.css';

export function SwitchNetworkModal() {
  const { options, log } = useWalletKit();
  const { isSupported, chain } = useUIChainInfo();
  const { onClickSwitchChain, isPending, chainsConfig } = useUISwitchingConfig();

  const { isClosable, isOpen, onClose } = useSwitchNetworkModal();
  const [targetChainId, setTargetChainId] = useState<number>();

  const onSwitchChain = (chainId: number) => {
    log('[switch network]', 'switchChain:', onClickSwitchChain, ', isPending:', isPending);

    if (onClickSwitchChain && !isPending) {
      setTargetChainId(chainId);
      onClickSwitchChain({
        chainId,
        onSuccess() {
          if (options.closeModalAfterSwitchingNetwork) {
            onClose();
          }
        },
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
