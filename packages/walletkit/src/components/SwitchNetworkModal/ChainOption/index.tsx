import { ChainProps } from '../../../chains/types';
import { cx } from '../../../utils/css';
import { Box } from '../../../base/components/Box';
import { Button, ButtonProps } from '../../../base/components/Button';
import {
  clsChainOptionLogo,
  clsChainOptionName,
  clsConnectedTag,
  clsContainer,
} from './styles.css';
import { ChainSpinner } from '../ChainSpinner';

export interface ChainOptionProps extends Omit<ButtonProps, 'data'> {
  data: ChainProps;
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
