import { Box } from '@/ui/base/components/Box';
import { Text } from '@/ui/base/components/Text';
import { Button } from '@/ui/base/components/Button';
import { cx } from '@/ui/base/utils/css';
import { useWalletRender } from '@/ui/hooks/useWalletRender';
import { WalletConfig } from '@/ui/types';
import {
  clsWalletOptionWrapper,
  clsWalletOption,
  clsWalletOptionDisabled,
  clsWalletOptionIcon,
  clsWalletOptionName,
} from './styles.css';

export interface WalletOptionProps {
  wallet: WalletConfig;
}

export function WalletOption(props: WalletOptionProps) {
  const renderOptions = useWalletRender(props.wallet, 'grid');

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
