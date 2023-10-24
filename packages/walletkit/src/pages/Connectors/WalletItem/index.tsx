import { Connector } from 'wagmi';

import { useWalletConfig } from '../../../hooks/useWalletConfig';
import { Button } from '../../../components/base/Button';
import { Text } from '../../../components/base/Text';
import { Box } from '../../../components/base/Box';
import { useClickWallet } from '../../../hooks/useClickWallet';
import { cx } from '../../../utils/css';
import { walletIcon, walletItem, walletName } from './styles.css';

export interface WalletItemProps {
  connector: Connector;
}

export function WalletItem(props: WalletItemProps) {
  const { connector } = props;

  const wallet = useWalletConfig(connector);
  const onClickWallet = useClickWallet();

  return (
    <Button className={cx('wk-wallet', walletItem)} onClick={(e) => onClickWallet(connector, e)}>
      <Text className={cx('wk-wallet-name', walletName)}>{wallet.name}</Text>
      <Box className={cx('wk-wallet-logo', walletIcon)}>{wallet.logos.default}</Box>
    </Button>
  );
}
