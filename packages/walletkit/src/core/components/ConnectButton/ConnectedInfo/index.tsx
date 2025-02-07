import { Box } from '@/core/base/components/Box';
import { Text } from '@/core/base/components/Text';
import { Button } from '@/core/base/components/Button';
import { cx } from '@/core/base/utils/css';
import { useProfileModal } from '@/core/modals/ProfileModal/context';
import { useSwitchNetworkModal } from '@/core/modals/SwitchNetworkModal/context';
import { useEvmBalance } from '@/evm/hooks/useEvmBalance';
import { useAccount } from 'wagmi';
import {
  clsAccountButton,
  clsAddress,
  clsBalance,
  clsChainButton,
  clsChainLogo,
  clsInfo,
  clsSeparator,
  clsWrongButton,
} from './style.css';
import { clsWalletkitButton } from '../style.css';
import { DownArrowIcon } from '@/core/base/icons/DownArrowIcon';
import { formatBalance, truncateAddress } from '@/core/utils/account';
import { Avatar } from '../../Avatar';
import { useEvmChain } from '@/evm/hooks/useEvmChain';

export function ConnectedInfo() {
  const { address } = useAccount();
  const { onOpen: onOpenSwitchNetworkModal } = useSwitchNetworkModal();
  const { onOpen: onOpenProfileModal } = useProfileModal();

  const { balance } = useEvmBalance(address);
  const { isSupported, displayConfig } = useEvmChain();

  return (
    <Box className={cx('wk-connected-button-group', clsInfo)}>
      {!isSupported ? (
        <Button
          className={cx('wk-wrong-network-button', clsWalletkitButton, clsWrongButton)}
          onClick={() => onOpenSwitchNetworkModal()}
        >
          Wrong network
          <DownArrowIcon />
        </Button>
      ) : (
        <>
          <Button
            className={cx('wk-chain-button', clsWalletkitButton, clsChainButton)}
            onClick={() => onOpenSwitchNetworkModal()}
          >
            <Box className={clsChainLogo}>{displayConfig?.logo}</Box>
            <Box>{displayConfig?.name}</Box>
            <DownArrowIcon />
          </Button>

          <Button
            className={cx('wk-account-button', clsWalletkitButton, clsAccountButton)}
            onClick={onOpenProfileModal}
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
