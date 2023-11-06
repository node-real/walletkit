import { useAccount, useBalance, useEnsName } from 'wagmi';
import { Avatar } from '../../components/Avatar';
import { CopyToClipboard } from '../../components/CopyToClipboard';
import { Navbar } from '../../components/Navbar';
import { ModalBody } from '../../base/components/Modal/ModalBody';
import { ModalHeader } from '../../base/components/Modal/ModalHeader';
import { clsAvatar, clsBalance, clsInfo } from './styles.css';
import { formatBalance, truncateAddress, truncateENSName } from '../../utils/account';
import { Box } from '../../base/components/Box';
import { DisconnectButton } from '../../components/DisconnectButton';

export function ConnectedPage() {
  const { address } = useAccount();

  const { data: ensName } = useEnsName({
    chainId: 1,
    address: address,
  });

  const { data: balance } = useBalance({
    address,
  });

  return (
    <>
      <Navbar />
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

        <DisconnectButton />
      </ModalBody>
    </>
  );
}
