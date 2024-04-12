import { Box } from '@/base/components/Box';
import { Text } from '@/base/components/Text';
import { Button } from '@/base/components/Button';
import { cx } from '@/index';
import { Connector } from 'wagmi';
import {
  clsWalletOption,
  clsWalletOptionName,
  clsWalletOptionIcon,
  clsWalletOptionWrapper,
  clsWalletOptionDisabled,
} from './styles.css';
import { useWalletRender } from '@/hooks/useWalletRender';

export interface WalletOptionProps {
  connector: Connector;
}

export function WalletOption(props: WalletOptionProps) {
  const renderOptions = useWalletRender(props.connector, 'grid');

  if (renderOptions.element) {
    return <>{renderOptions.element}</>;
  }

  const { logo, name, isDisabled } = renderOptions.wallet;

  return (
    <Box className={cx('wk-wallet-option-wrapper', clsWalletOptionWrapper)}>
      <Button
        className={cx(
          'wk-wallet-option',
          clsWalletOption,
          isDisabled ? clsWalletOptionDisabled : undefined,
        )}
        onClick={isDisabled ? undefined : renderOptions.onClick}
      >
        <Box className={cx('wk-wallet-option-logo', clsWalletOptionIcon)}>{logo}</Box>
        <Text className={cx('wk-wallet-option-name', clsWalletOptionName)}>{name}</Text>
      </Button>
    </Box>
  );
}
