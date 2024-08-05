import { Box } from '@/ui/base/components/Box';
import { Text } from '@/ui/base/components/Text';
import { Button } from '@/ui/base/components/Button';
import { cx } from '@/ui/base/utils/css';
import { useWalletRender } from '@/ui/hooks/useWalletRender';
import { WalletConfig } from '@/ui/types';
import {
  clsWalletOption,
  clsWalletOptionDisabled,
  clsWalletOptionName,
  clsWalletOptionIcon,
} from './styles.css';

export interface WalletOptionProps {
  wallet: WalletConfig;
}

export function WalletOption(props: WalletOptionProps) {
  const renderOptions = useWalletRender(props.wallet, 'list');

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
