import { cx } from '../../../utils/css';
import { clsContainer, clsChildren, clsErrorCircle, clsLoading } from './styles.css';
import { Box, BoxProps } from '../../../base/components/Box';
import { CircleLoadingIcon } from '../../../base/icons/CircleLoadingIcon';

export interface CircleSpinnerProps extends BoxProps {
  isLoading?: boolean;
  isError?: boolean;
  thickness?: number;
  loadingColor?: string;
}

export function CircleSpinner(props: CircleSpinnerProps) {
  const {
    className,
    isLoading = false,
    isError = false,
    thickness = 2,
    loadingColor,
    children,
    ...restProps
  } = props;

  return (
    <Box className={cx('wk-circle-spinner', clsContainer, className)} {...restProps}>
      {isLoading && (
        <CircleLoadingIcon className={clsLoading} thickness={thickness} endColor={loadingColor} />
      )}
      {isError && <Box className={clsErrorCircle} />}

      <Box className={clsChildren}>{children}</Box>
    </Box>
  );
}
