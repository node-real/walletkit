import { Box } from '@/base/components/Box';
import { Text } from '@/base/components/Text';
import { Button } from '@/base/components/Button';
import { cx } from '@/index';
import { Connector } from 'wagmi';
import {
  clsWalletOption,
  clsWalletOptionName,
  clsWalletOptionIcon,
  clsWalletOptionDisabled,
} from './styles.css';
import { useWalletRender } from '@/hooks/useWalletRender';

export interface WalletOptionProps {
  connector: Connector;
}

export function WalletOption(props: WalletOptionProps) {
  const renderOptions = useWalletRender(props.connector, 'list');

  if (renderOptions.element) {
    return <>{renderOptions.element}</>;
  }

  const { logo, name, isDisabled } = renderOptions.wallet;

  return (
    <Button
      className={cx(
        'wk-wallet-option',
        clsWalletOption,
        isDisabled ? clsWalletOptionDisabled : undefined,
      )}
      onClick={isDisabled ? undefined : renderOptions.onClick}
    >
      <Text className={cx('wk-wallet-option-name', clsWalletOptionName)}>{name}</Text>
      <Box className={cx('wk-wallet-option-logo', clsWalletOptionIcon)}>{logo}</Box>
    </Button>
  );
}
