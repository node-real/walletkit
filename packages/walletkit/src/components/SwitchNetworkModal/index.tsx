import { useAccount, useConnect, useDisconnect, useNetwork } from 'wagmi';
import { useEffect } from 'react';
import { useWalletKitSwitchNetwork } from '../../hooks/useWalletKitSwitchNetwork';
import { useWalletKitContext } from '../WalletKitProvider/context';
import { Box, BoxProps } from '../base/Box';
import { useDisclosure } from '../../hooks/useDisclosure';
import { useIsMounted } from '../../hooks/useIsMounted';
import { ModalHeader } from '../base/Modal/ModalHeader';
import { cx } from '../../utils/css';
import { Modal } from '../base/Modal';
import { chainList, container, content, description, disconnectButton } from './styles.css';
import { Description } from '../../pages/Connecting/Content/Description';
import { ChainOption } from './ChainOption';
import { Button } from '../base/Button';
import { DividerWithText } from './DividerWithText';
import { ExitIcon } from '../base/icons/ExitIcon';

export type SwitchNetworkModalProps = BoxProps;

export function SwitchNetworkModal(props: SwitchNetworkModalProps) {
  const { className, ...restProps } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMounted = useIsMounted();

  const { chain } = useNetwork();
  const { isConnected } = useAccount();
  const { reset } = useConnect();
  const { disconnect } = useDisconnect();
  const { isLoading, switchNetwork } = useWalletKitSwitchNetwork();

  const { supportedChains } = useWalletKitContext();

  const onDisconnect = () => {
    disconnect();
    reset();
    onClose();
  };

  const onSwitchNetwork = (chainId: number) => {
    if (switchNetwork && !isLoading) {
      switchNetwork(chainId);
    }
  };

  useEffect(() => {
    if (isConnected) {
      const timer = setTimeout(() => {
        if (chain?.unsupported) {
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
  }, [chain?.unsupported, isConnected, onClose, onOpen]);

  if (!isMounted) return null;

  return (
    <Modal
      className={cx('wk-switch-network-modal', container, className)}
      isOpen={isOpen}
      onClose={onClose}
      closeOnEsc={false}
      closeOnOverlayClick={false}
      {...restProps}
    >
      <ModalHeader>Switch Network</ModalHeader>
      <Box className={cx('wk-modal-body', content)}>
        <Description className={description}>
          This app does not support the current connected network. Switch or disconnect to continue.
        </Description>
        <Box className={cx('wk-chains', chainList)}>
          {supportedChains?.map((item) => {
            return (
              <ChainOption key={item.id} data={item} onClick={() => onSwitchNetwork(item.id)} />
            );
          })}
        </Box>

        <DividerWithText>or</DividerWithText>

        <Button className={cx('wk-disconnect-button', disconnectButton)} onClick={onDisconnect}>
          <ExitIcon />
          Disconnect
        </Button>
      </Box>
    </Modal>
  );
}
