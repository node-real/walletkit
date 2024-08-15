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
    layout: 'list',
    clickRef,
    defaultRender: ({ wallet, onClick }) => {
      const { isDisabled, name, logo } = wallet;
      return (
        <Box className={cx('wk-wallet-option-wrapper', clsWalletOptionWrapper)}>
          <Button
            className={cx(
              'wk-wallet-option',
              clsWalletOption,
              isDisabled ? clsWalletOptionDisabled : undefined,
            )}
            onClick={isDisabled ? undefined : onClick}
          >
            <Box className={cx('wk-wallet-option-logo', clsWalletOptionIcon)}>{logo}</Box>
            <Text className={cx('wk-wallet-option-name', clsWalletOptionName)}>{name}</Text>
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
