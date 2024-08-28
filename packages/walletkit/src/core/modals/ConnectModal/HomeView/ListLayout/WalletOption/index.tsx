import {
  clsWalletOption,
  clsWalletOptionDisabled,
  clsWalletOptionName,
  clsWalletOptionIcon,
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
        <Button
          className={cx(
            'wk-wallet-option',
            clsWalletOption,
            isDisabled ? clsWalletOptionDisabled : undefined,
          )}
          onClick={isDisabled ? undefined : onClick}
        >
          <Text className={cx('wk-wallet-option-name', clsWalletOptionName)}>{name}</Text>
          <Box className={cx('wk-wallet-option-logo', clsWalletOptionIcon)}>{logo}</Box>
        </Button>
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
