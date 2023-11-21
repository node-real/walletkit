import { Box } from '@/base/components/Box';
import { ModalBody } from '@/base/components/Modal/ModalBody';
import { ModalHeader } from '@/base/components/Modal/ModalHeader';
import { Avatar } from '@/components/Avatar';
import { CopyToClipboard } from '@/components/CopyToClipboard';
import { DisconnectButton } from '@/components/DisconnectButton';
import { Navbar } from '@/components/Navbar';
import { truncateENSName, truncateAddress, formatBalance } from '@/utils/account';
import { useAccount, useBalance, useEnsName } from 'wagmi';
import { clsAvatar, clsInfo, clsBalance } from './styles.css';

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
