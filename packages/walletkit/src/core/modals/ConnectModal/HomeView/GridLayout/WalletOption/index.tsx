import {
  clsWalletOptionWrapper,
  clsWalletOption,
  clsWalletOptionDisabled,
  clsWalletOptionIcon,
  clsWalletOptionName,
} from './styles.css';
import { Box } from '@/core/base/components/Box';
import { Text } from '@/core/base/components/Text';
import { Button } from '@/core/base/components/Button';
import { cx } from '@/core/base/utils/css';
import { useWalletRender } from '@/core/hooks/useWalletRender';
import { BaseWallet } from '@/core/configs/types';
import { useRef } from 'react';
import { SetWalletClickRef } from '../../SetWalletClickRef';

export function WalletOption(props: { wallet: BaseWallet }) {
  const { wallet } = props;

  const clickRef = useRef<any>();
  const component = useWalletRender({
    wallet,
    layout: 'grid',
    clickRef,
    defaultRender: ({ wallet, onClick }) => {
      const { isDisabled, name, logo } = wallet;

      return (
        <Box className={cx(clsWalletOptionWrapper, 'wk-wallet-option-wrapper')}>
          <Button
            className={cx(
              clsWalletOption,
              isDisabled ? clsWalletOptionDisabled : undefined,
              'wk-wallet-option',
            )}
            onClick={isDisabled ? undefined : onClick}
          >
            <Box className={cx(clsWalletOptionIcon, 'wk-wallet-option-logo')}>{logo}</Box>
            <Text className={cx(clsWalletOptionName, 'wk-wallet-option-name')}>{name}</Text>
          </Button>
        </Box>
      );
    },
  });

  return (
    <>
      <SetWalletClickRef wallet={wallet} clickRef={clickRef} />
      {component}
    </>
  );
}
