import { Connector } from 'wagmi';

import { useWalletConfig } from '../../../hooks/useWalletConfig';
import { Button } from '../../../base/components/Button';
import { Text } from '../../../base/components/Text';
import { Box } from '../../../base/components/Box';
import { useClickWallet } from '../../../hooks/useClickWallet';
import { cx } from '../../../base/utils/css';
import { clsWalletOption, clsWalletOptionIcon, clsWalletOptionName } from './styles.css';
import { useWalletLogos } from '../../../hooks/useWalletLogos';

export interface WalletOptionProps {
  connector: Connector;
}

export function WalletOption(props: WalletOptionProps) {
  const { connector } = props;

  const onClickWallet = useClickWallet();

  const wallet = useWalletConfig(connector);
  const logos = useWalletLogos(wallet.logos);

  return (
    <Button
      className={cx('wk-wallet-option', clsWalletOption)}
      onClick={(e) => onClickWallet(connector, e)}
    >
      <Text className={cx('wk-wallet-option-name', clsWalletOptionName)}>{wallet.name}</Text>
      <Box className={cx('wk-wallet-option-logo', clsWalletOptionIcon)}>{logos.default}</Box>
    </Button>
  );
}
