import { Box } from '@/ui/base/components/Box';
import { ButtonProps, Button } from '@/ui/base/components/Button';
import { cx } from '@/ui/base/utils/css';
import { ChainConfig } from '@/ui/types';
import { ChainSpinner } from '../ChainSpinner';
import {
  clsContainer,
  clsChainOptionLogo,
  clsChainOptionName,
  clsConnectedTag,
} from './styles.css';

export interface ChainOptionProps extends Omit<ButtonProps, 'data'> {
  data: ChainConfig;
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
