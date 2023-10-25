import { Connector } from 'wagmi';

import { useWalletConfig } from '../../../hooks/useWalletConfig';
import { Button } from '../../../components/base/Button';
import { Text } from '../../../components/base/Text';
import { Box } from '../../../components/base/Box';
import { useClickWallet } from '../../../hooks/useClickWallet';
import { cx } from '../../../utils/css';
import { walletOption, walletOptionIcon, walletOptionName } from './styles.css';

export interface WalletOptionProps {
  connector: Connector;
}

export function WalletOption(props: WalletOptionProps) {
  const { connector } = props;

  const wallet = useWalletConfig(connector);
  const onClickWallet = useClickWallet();

  return (
    <Button
      className={cx('wk-wallet-option', walletOption)}
      onClick={(e) => onClickWallet(connector, e)}
    >
      <Text className={cx('wk-wallet-option-name', walletOptionName)}>{wallet.name}</Text>
      <Box className={cx('wk-wallet-option-logo', walletOptionIcon)}>{wallet.logos.default}</Box>
    </Button>
  );
}
