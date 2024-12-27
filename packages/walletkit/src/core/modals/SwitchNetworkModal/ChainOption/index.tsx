import { Button, ButtonProps } from '@/core/base/components/Button';
import { ChainSpinner } from '../ChainSpinner';
import {
  clsContainer,
  clsChainOptionLogo,
  clsChainOptionName,
  clsConnectedTag,
} from './styles.css';
import { Box } from '@/core/base/components/Box';
import { cx } from '@/core/base/utils/css';
import { ChainDisplayConfig } from '@/evm/chains/types';

export interface ChainOptionProps extends Omit<ButtonProps, 'data'> {
  data: ChainDisplayConfig;
  isLoading: boolean;
  isConnected: boolean;
}

export function ChainOption(props: ChainOptionProps) {
  const { data, isLoading, isConnected, ...restProps } = props;

  return (
    <Button className={cx('wk-chain-option', clsContainer)} {...restProps}>
      <ChainSpinner isLoading={isLoading}>
        <Box className={cx('wk-chain-option-logo', clsChainOptionLogo)}>{data.logo}</Box>
      </ChainSpinner>
      <Box className={cx('wk-chain-option-name', clsChainOptionName)}>{data.name}</Box>
      {isConnected && <Box className={clsConnectedTag}>Connected</Box>}
    </Button>
  );
}
