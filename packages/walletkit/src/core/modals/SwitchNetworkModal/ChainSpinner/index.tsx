import { Box, BoxProps } from '@/core/base/components/Box';
import { clsContainer, clsLoading } from './styles.css';
import { ChainSpinnerIcon } from '@/core/base/icons/ChainSpinnerIcon';
import { cx } from '@/core/base/utils/css';

export interface ChainSpinnerProps extends BoxProps {
  isLoading: boolean;
}

export function ChainSpinner(props: ChainSpinnerProps) {
  const { isLoading, className, children, ...restProps } = props;

  return (
    <Box className={cx('wk-chain-spinner', clsContainer, className)} {...restProps}>
      {isLoading && <ChainSpinnerIcon className={clsLoading} />}
      <Box>{children}</Box>
    </Box>
  );
}
