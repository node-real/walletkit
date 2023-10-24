import { cx } from '../../utils/css';
import { CircleLoadingIcon } from '../icons/CircleLoadingIcon';
import { circleSpinner, circleSpinnerInner, errorCircle, loading } from './styles.css';
import { Box, BoxProps } from '../base/Box';

export interface CircleSpinnerProps extends BoxProps {
  isLoading?: boolean;
  isError?: boolean;
  thickness?: number;
}

export function CircleSpinner(props: CircleSpinnerProps) {
  const {
    className,
    isLoading = false,
    isError = false,
    thickness = 2,
    children,
    ...restProps
  } = props;

  return (
    <Box className={cx('wk-circle-spinner', circleSpinner, className)} {...restProps}>
      <Box className={circleSpinnerInner}>{children}</Box>
      {isLoading && <CircleLoadingIcon className={loading} thickness={thickness} />}
      {isError && <Box className={errorCircle} />}
    </Box>
  );
}
