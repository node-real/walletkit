import { useAccount, useBalance, useEnsName, useNetwork } from 'wagmi';
import { Text } from '../../../../base/Text';
import { Avatar } from '../../../Avatar';
import { formatBalance, truncateAddress, truncateENSName } from '../../../../utils/account';
import { Box } from '../../../../base/Box';
import { Button } from '../../../../base/Button';
import { useCallback } from 'react';
import { useRouter } from '../../../RouteProvider/context';
import { routes } from '../../../RouteProvider';
import { cx, useWalletKitContext } from '../../../..';
import { useChainConfig } from '../../../../hooks/useChainConfig';
import {
  clsAccountButton,
  clsAddress,
  clsBalance,
  clsChainButton,
  clsChainLogo,
  clsInfo,
  clsSeparator,
  clsWrongButton,
} from './styles.css';
import { clsWalletkitButton } from '../styles.css';
import { DownArrowIcon } from '../../../../base/icons/DownArrowIcon';
import { useDisclosure } from '../../../../hooks/useDisclosure';
import { SwitchModal } from '../../../SwitchNetworkModal/SwitchModal';

export function ConnectedInfo() {
  const { address } = useAccount();
  const router = useRouter();

  const { onOpen: openProfile } = useWalletKitContext();

  const onOpenProfile = useCallback(() => {
    router.replace(routes.CONNECTED);
    openProfile();
  }, [openProfile, router]);

  const { data: ensName } = useEnsName({
    chainId: 1,
    address: address,
  });

  const { data: balance } = useBalance({
    address,
  });

  const { chain } = useNetwork();
  const chainConfig = useChainConfig(chain);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const onOpenSwitchNetworkModal = useCallback(() => {
    onOpen();
  }, [onOpen]);

  return (
    <Box className={cx('wk-info', clsInfo)}>
      <SwitchModal isOpen={isOpen} onClose={onClose} closeOnEsc closeOnOverlayClick isClosable />

      {chain?.unsupported ? (
        <Button
          className={cx('wk-wrong-network-button', clsWalletkitButton, clsWrongButton)}
          onClick={onOpenSwitchNetworkModal}
        >
          Wrong network
          <DownArrowIcon />
        </Button>
      ) : (
        <>
          <Button
            className={cx('wk-chain-button', clsWalletkitButton, clsChainButton)}
            onClick={onOpenSwitchNetworkModal}
          >
            <Box className={clsChainLogo}>{chainConfig?.logo}</Box>
            <Box title={chainConfig.name}>{truncateENSName(chainConfig.name)}</Box>
            <DownArrowIcon />
          </Button>

          <Button
            className={cx('wk-account-button', clsWalletkitButton, clsAccountButton)}
            onClick={onOpenProfile}
          >
            {balance && (
              <>
                <Box className={cx('wk-account-balance', clsBalance)}>{formatBalance(balance)}</Box>
                <Box className={clsSeparator} />
              </>
            )}
            <Box className={cx('wk-account-address', clsAddress)}>
              <Avatar address={address} />
              <Text as="span">{ensName ? truncateENSName(ensName) : truncateAddress(address)}</Text>
              <DownArrowIcon />
            </Box>
          </Button>
        </>
      )}
    </Box>
  );
}
