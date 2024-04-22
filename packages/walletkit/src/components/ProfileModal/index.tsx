import { Box } from '@/base/components/Box';
import { ModalBody } from '@/base/components/Modal/ModalBody';
import { ModalHeader } from '@/base/components/Modal/ModalHeader';
import { Avatar } from '@/components/Avatar';
import { CopyToClipboard } from '@/components/CopyToClipboard';
import { DisconnectButton } from '@/components/DisconnectButton';
import { Navbar } from '@/components/Navbar';
import { truncateENSName, truncateAddress, formatBalance } from '@/utils/account';
import { useAccount, useBalance, useEnsName } from 'wagmi';
import { clsAvatar, clsInfo, clsBalance, clsFooter } from './styles.css';
import { ModalFooter } from '@/base/components/Modal/ModalFooter';
import { Modal } from '@/base/components/Modal';
import { useProfileModal } from './ProfileModalProvider/context';
import { useWalletKitContext } from '../WalletKitProvider/context';

export function ProfileModal() {
  const { address } = useAccount();
  const { options } = useWalletKitContext();
  const { isOpen, onClose } = useProfileModal();

  const { data: ensName } = useEnsName({
    chainId: 1,
    address: address,
  });

  const { data: balance } = useBalance({
    address,
  });

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
          <CopyToClipboard value={address}>
            {ensName ? truncateENSName(ensName, 64) : truncateAddress(address)}
          </CopyToClipboard>

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
