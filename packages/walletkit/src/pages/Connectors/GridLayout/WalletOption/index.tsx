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

  return (
    <Box
      className={cx('wk-wallet-option-wrapper', clsWalletOptionWrapper)}
      onClick={renderOptions.onClick}
    >
      <Button className={cx('wk-wallet-option', clsWalletOption)}>
        <Box className={cx('wk-wallet-option-logo', clsWalletOptionIcon)}>{renderOptions.logo}</Box>
        <Text className={cx('wk-wallet-option-name', clsWalletOptionName)}>
          {renderOptions.name}
        </Text>
      </Button>
    </Box>
  );
}
