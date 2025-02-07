import { useSwitchNetworkModal } from './context';
import { useWalletKit } from '@/core/providers/WalletKitProvider/context';
import { useEvmSwitchChain } from '@/evm/hooks/useEvmSwitchChain';
import { Modal } from '@/core/base/components/Modal';
import { Navbar } from '@/core/components/Navbar';
import { ModalHeader } from '@/core/base/components/Modal/ModalHeader';
import { ModalBody } from '@/core/base/components/Modal/ModalBody';
import { Box } from '@/core/base/components/Box';
import { cx } from '@/core/base/utils/css';
import {
  clsBody,
  clsChains,
  clsDescription,
  clsFooter,
  clsNoNavHeader,
  clsOrSeparator,
} from './styles.css';
import { ChainOption } from './ChainOption';
import { ModalFooter } from '@/core/base/components/Modal/ModalFooter';
import { DisconnectButton } from '@/core/components/DisconnectButton';
import { ChainDisplayConfig } from '@/evm/chains/types';
import { UnknownChainIcon } from '@/evm/chains/icons/UnknownChainIcon';
import { useEvmChain } from '@/evm/hooks/useEvmChain';

export function SwitchNetworkModal() {
  const { isClosable, isOpen, onClose } = useSwitchNetworkModal();
  const { log, options, evmConfig } = useWalletKit();

  const { isSupported, chain, chains } = useEvmChain();

  const { isPending, switchChain, variables } = useEvmSwitchChain({
    mutation: {
      onSuccess() {
        if (options.closeModalAfterSwitchingNetwork) {
          onClose();
        }
      },
    },
  });

  const onSwitchNetwork = (chainId: number) => {
    log('[switch network page]', 'switchNetwork:', switchChain, ', isLoading:', isPending);

    if (switchChain && !isPending) {
      switchChain({ chainId });
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
          {chains?.map((item) => {
            const config = evmConfig?.chainDisplayConfigs?.find((e) => e.id === item.id);
            const defaultConfig: ChainDisplayConfig = {
              id: item.id,
              name: config?.name ?? item.name,
              logo: config?.name ?? <UnknownChainIcon />,
            };

            return (
              <ChainOption
                key={item.id}
                data={config ?? defaultConfig}
                isLoading={isPending && variables?.chainId === item.id}
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
