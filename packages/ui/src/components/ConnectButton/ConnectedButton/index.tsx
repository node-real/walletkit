import { Box } from '@/base/components/Box';
import { Text } from '@/base/components/Text';
import { Button } from '@/base/components/Button';
import { DownArrowIcon } from '@/base/icons/DownArrowIcon';
import { Avatar } from '@/components/Avatar';
import { cx, useProfileModal, useSwitchNetworkModal } from '@/index';
import { formatBalance, truncateAddress, truncateName } from '@/utils/account';
import { clsConnectButton } from '../styles.css';
import {
  clsInfo,
  clsWrongButton,
  clsChainButton,
  clsChainLogo,
  clsAccountButton,
  clsBalance,
  clsSeparator,
  clsAddress,
} from './styles.css';
import { useDataSource } from '@/components/DataSourceProvider/context';

export function ConnectedButton() {
  const { useConnectedButton, useAccount, useChain } = useDataSource();
  const { balance, address } = useAccount();
  const { isSupported } = useChain();
  const { chainLogo, chainName } = useConnectedButton();

  const switchNetworkModal = useSwitchNetworkModal();
  const profileModal = useProfileModal();

  return (
    <Box className={cx('wk-connected-button-group', clsInfo)}>
      {!isSupported ? (
        <Button
          className={cx('wk-wrong-network-button', clsConnectButton, clsWrongButton)}
          onClick={() => switchNetworkModal.onOpen()}
        >
          Wrong network
          <DownArrowIcon />
        </Button>
      ) : (
        <>
          {chainLogo && chainName && (
            <>
              <Button
                className={cx('wk-chain-button', clsConnectButton, clsChainButton)}
                onClick={() => switchNetworkModal.onOpen()}
              >
                <Box className={clsChainLogo}>{chainLogo}</Box>
                <Box title={chainName}>{truncateName(chainName)}</Box>
                <DownArrowIcon />
              </Button>
            </>
          )}

          <Button
            className={cx('wk-account-button', clsConnectButton, clsAccountButton)}
            onClick={() => profileModal.onOpen()}
          >
            {balance && (
              <>
                <Box className={cx('wk-account-balance', clsBalance)}>{formatBalance(balance)}</Box>
                <Box className={clsSeparator} />
              </>
            )}
            <Box className={cx('wk-account-address', clsAddress)}>
              <Avatar address={address} />
              <Text as="span">{truncateAddress(address)}</Text>
              <DownArrowIcon />
            </Box>
          </Button>
        </>
      )}
    </Box>
  );
}
