import { Box } from '@/ui/base/components/Box';
import { Modal } from '@/ui/base/components/Modal';
import { ModalBody } from '@/ui/base/components/Modal/ModalBody';
import { ModalFooter } from '@/ui/base/components/Modal/ModalFooter';
import { ModalHeader } from '@/ui/base/components/Modal/ModalHeader';
import { Avatar } from '@/ui/components/Avatar';
import { DisconnectButton } from '@/ui/components/DisconnectButton';
import { Navbar } from '@/ui/components/Navbar';
import { truncateAddress, formatBalance } from '@/ui/utils/account';
import { useProfileModal } from './context';
import { CopyToClipboard } from './CopyToClipboard';
import { clsAvatar, clsInfo, clsBalance, clsFooter } from './styles.css';
import { useWalletKit } from '@/core/components/WalletKitProvider/context';
import { useUIAccountInfo } from '@/ui-data/useUIAccountInfo';

export function ProfileModal() {
  const { options } = useWalletKit();
  const { address, balance } = useUIAccountInfo();

  const { isOpen, onClose } = useProfileModal();

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
