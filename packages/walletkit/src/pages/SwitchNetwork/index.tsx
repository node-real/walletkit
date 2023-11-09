import { useNetwork } from 'wagmi';
import { ModalHeader } from '../../base/components/Modal/ModalHeader';
import { Navbar } from '../../components/Navbar';
import { ModalBody } from '../../base/components/Modal/ModalBody';
import { clsChains, clsDescription, clsOrSeparator } from './styles.css';
import { useWalletKitContext } from '../../components/WalletKitProvider/context';
import { useWalletKitSwitchNetwork } from '../../hooks/useWalletKitSwitchNetwork';
import { Box } from '../../base/components/Box';
import { cx } from '../../base/utils/css';
import { ChainOption } from './ChainOption';
import { DisconnectButton } from '../../components/DisconnectButton';
import { useModal } from '../..';

export function SwitchNetworkPage() {
  const { supportedChains } = useWalletKitContext();
  const { isLoading, switchNetwork, pendingChainId } = useWalletKitSwitchNetwork();
  const { chain } = useNetwork();
  const { isClosable } = useModal();

  const onSwitchNetwork = (chainId: number) => {
    if (switchNetwork && !isLoading) {
      switchNetwork(chainId);
    }
  };

  return (
    <>
      {isClosable && <Navbar />}
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
    </>
  );
}
