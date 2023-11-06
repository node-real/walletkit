import { Box, BoxProps } from '../../../base/components/Box';
import { ChainSpinnerIcon } from '../../../base/icons/ChainSpinnerIcon';
import { cx } from '../../../base/utils/css';
import { clsContainer, clsLoading } from './styles.css';

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
