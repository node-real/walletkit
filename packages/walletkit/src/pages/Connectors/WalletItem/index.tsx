import { Connector } from 'wagmi';

// import { useClickWallet } from '../../../hooks/useClickWallet';
import { useWalletConfig } from '../../../hooks/useWalletConfig';
import { Button } from '../../../components/base/Button';
import { Text } from '../../../components/base/Text';
import * as styles from './styles';
import { Box } from '../../../components/base/Box';
import { useClickWallet } from '../../../hooks/useClickWallet';

export interface WalletItemProps {
  connector: Connector;
}

export function WalletItem(props: WalletItemProps) {
  const { connector } = props;

  const wallet = useWalletConfig(connector);
  const onClickWallet = useClickWallet();

  return (
    <Button className="wk-wallet" css={styles.wallet} onClick={(e) => onClickWallet(connector, e)}>
      <Text className="wk-wallet-name" css={styles.walletName}>
        {wallet.name}
      </Text>
      <Box className="wk-wallet-logo" css={styles.walletIcon}>
        {wallet.logos.default}
      </Box>
    </Button>
  );
}
