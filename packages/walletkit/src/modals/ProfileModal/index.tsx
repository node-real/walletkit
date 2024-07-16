import { Box } from '@/base/components/Box';
import { ModalBody } from '@/base/components/Modal/ModalBody';
import { ModalHeader } from '@/base/components/Modal/ModalHeader';
import { Avatar } from '@/components/Avatar';
import { CopyToClipboard } from '@/modals/ProfileModal/CopyToClipboard';
import { DisconnectButton } from '@/components/DisconnectButton';
import { truncateAddress, formatBalance } from '@/utils/account';
import { useAccount, useBalance } from 'wagmi';
import { clsAvatar, clsInfo, clsBalance, clsFooter } from './styles.css';
import { ModalFooter } from '@/base/components/Modal/ModalFooter';
import { Modal } from '@/base/components/Modal';
import { useWalletKit } from '@/components/WalletKitProvider/context';
import { Navbar } from '@/components/Navbar';
import { useProfileModal } from './context';

export function ProfileModal() {
  const { address } = useAccount();
  const { options } = useWalletKit();
  const { isOpen, onClose } = useProfileModal();

  const { data: balance } = useBalance({
    address,
  });

  return (
    <Modal
      className="wk-profile-modal"
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
