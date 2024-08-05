import { useUIAccountInfo } from '@/ui-data/useUIAccountInfo';
import { useUIChainInfo } from '@/ui-data/useUIChainInfo';
import { Box } from '@/ui/base/components/Box';
import { Text } from '@/ui/base/components/Text';
import { Button } from '@/ui/base/components/Button';
import { DownArrowIcon } from '@/ui/base/icons/DownArrowIcon';
import { cx } from '@/ui/base/utils/css';
import { useProfileModal } from '@/ui/modals/ProfileModal/context';
import { useSwitchNetworkModal } from '@/ui/modals/SwitchNetworkModal/context';
import { truncateName, formatBalance, truncateAddress } from '@/ui/utils/account';
import { Avatar } from '../../Avatar';
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
import { useUIConnectedButton } from '@/ui-data/useUIConnectedButton';

export function ConnectedButton() {
  const { balance, address } = useUIAccountInfo();
  const { isSupported } = useUIChainInfo();
  const { chainLogo, chainName } = useUIConnectedButton();

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
