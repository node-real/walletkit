import { Box } from '@/base/components/Box';
import { Text } from '@/base/components/Text';
import { Button } from '@/base/components/Button';
import { useClickWallet } from '@/hooks/useClickWallet';
import { useWalletConfig } from '@/hooks/useWalletConfig';
import { useWalletLogos } from '@/hooks/useWalletLogos';
import { cx } from '@/index';
import { Connector } from 'wagmi';
import { clsWalletOption, clsWalletOptionName, clsWalletOptionIcon } from './styles.css';

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
      <Box className={cx('wk-wallet-option-logo', clsWalletOptionIcon)}>{logos.transparent}</Box>
    </Button>
  );
}
