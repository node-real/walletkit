import { ChainProps } from '../../../chains/types';
import { cx } from '../../../utils/css';
import { Box } from '../../base/Box';
import { Button, ButtonProps } from '../../base/Button';
import { chainOptionLogo, chainOptionName, container } from './styles.css';

export interface ChainOptionProps extends Omit<ButtonProps, 'data'> {
  data: ChainProps;
}

export function ChainOption(props: ChainOptionProps) {
  const { data, ...restProps } = props;

  return (
    <Button className={cx('wk-chain-option', container)} {...restProps}>
      <Box className={cx('wk-chain-option-logo', chainOptionLogo)}>{data.logo}</Box>
      <Box className={cx('wk-chain-option-name', chainOptionName)}>{data.name}</Box>
    </Button>
  );
}
