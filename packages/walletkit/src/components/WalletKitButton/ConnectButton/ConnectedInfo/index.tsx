import { Box } from '@/base/components/Box';
import { Text } from '@/base/components/Text';
import { Button } from '@/base/components/Button';
import { DownArrowIcon } from '@/base/icons/DownArrowIcon';
import { Avatar } from '@/components/Avatar';
import { useChainConfig } from '@/hooks/useChainConfig';
import { cx, useProfileModal, useSwitchNetworkModal } from '@/index';
import { formatBalance, truncateAddress, truncateName } from '@/utils/account';
import { useAccount } from 'wagmi';
import { clsWalletkitButton } from '../styles.css';
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
import { useChainIsSupported } from '@/hooks/useChainIsSupported';
import { useWalletKitBalance } from '@/hooks/useWalletKitBalance';

export function ConnectedInfo() {
  const { address, chain } = useAccount();

  const switchNetworkModal = useSwitchNetworkModal();
  const profileModal = useProfileModal();

  const { balance } = useWalletKitBalance(address);
  const chainConfig = useChainConfig(chain);
  const isSupported = useChainIsSupported();

  return (
    <Box className={cx('wk-connected-button-group', clsInfo)}>
      {!isSupported ? (
        <Button
          className={cx('wk-wrong-network-button', clsWalletkitButton, clsWrongButton)}
          onClick={() => switchNetworkModal.onOpen()}
        >
          Wrong network
          <DownArrowIcon />
        </Button>
      ) : (
        <>
          <Button
            className={cx('wk-chain-button', clsWalletkitButton, clsChainButton)}
            onClick={() => switchNetworkModal.onOpen()}
          >
            <Box className={clsChainLogo}>{chainConfig?.logo}</Box>
            <Box title={chainConfig.name}>{truncateName(chainConfig.name)}</Box>
            <DownArrowIcon />
          </Button>

          <Button
            className={cx('wk-account-button', clsWalletkitButton, clsAccountButton)}
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
