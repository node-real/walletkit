import { useWalletKit } from '@/core/providers/WalletKitProvider/context';
import { useAccount } from 'wagmi';
import { useProfileModal } from './context';
import { useEvmBalance } from '@/evm/hooks/useEvmBalance';
import { Modal } from '@/core/base/components/Modal';
import { Navbar } from '@/core/components/Navbar';
import { ModalHeader } from '@/core/base/components/Modal/ModalHeader';
import { Avatar } from '@/core/components/Avatar';
import { clsAvatar, clsBalance, clsFooter, clsInfo } from './style.css';
import { Box } from '@/core/base/components/Box';
import { ModalBody } from '@/core/base/components/Modal/ModalBody';
import { formatBalance, truncateAddress } from '@/core/utils/account';
import { ModalFooter } from '@/core/base/components/Modal/ModalFooter';
import { DisconnectButton } from '@/core/components/DisconnectButton';
import { CopyToClipboard } from '@/core/components/CopyToClipboard';

export function ProfileModal() {
  const { address } = useAccount();
  const { options } = useWalletKit();
  const { isOpen, onClose } = useProfileModal();
  const { balance } = useEvmBalance(address);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnEsc={options.closeModalOnEsc}
      closeOnOverlayClick={options.closeModalOnOverlayClick}
    >
      <Navbar onClose={onClose} />
      <ModalHeader>Connected</ModalHeader>
      <ModalBody>
        <Avatar className={clsAvatar} address={address} />

        <Box className={clsInfo}>
          <CopyToClipboard value={address}>{truncateAddress(address)}</CopyToClipboard>

          <Box className={clsBalance}>
            <>{balance ? `${formatBalance(balance)}` : '-'}</>
          </Box>
        </Box>
      </ModalBody>

      <ModalFooter className={clsFooter}>
        <DisconnectButton />
      </ModalFooter>
    </Modal>
  );
}
