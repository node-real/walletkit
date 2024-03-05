import { Box } from '@/base/components/Box';
import { Text } from '@/base/components/Text';
import { Button } from '@/base/components/Button';
import { cx } from '@/index';
import { Connector } from 'wagmi';
import { clsWalletOption, clsWalletOptionName, clsWalletOptionIcon } from './styles.css';
import { useWalletRender } from '@/hooks/useWalletRender';

export interface WalletOptionProps {
  connector: Connector;
}

export function WalletOption(props: WalletOptionProps) {
  const renderOptions = useWalletRender(props.connector, 'list');

  if (renderOptions.element) {
    return <>{renderOptions.element}</>;
  }

  return (
    <Button className={cx('wk-wallet-option', clsWalletOption)} onClick={renderOptions.onClick}>
      <Text className={cx('wk-wallet-option-name', clsWalletOptionName)}>{renderOptions.name}</Text>
      <Box className={cx('wk-wallet-option-logo', clsWalletOptionIcon)}>{renderOptions.logo}</Box>
    </Button>
  );
}
