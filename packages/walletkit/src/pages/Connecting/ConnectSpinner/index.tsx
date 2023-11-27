import { BoxProps, Box } from '@/base/components/Box';
import { CircleLoadingIcon } from '@/base/icons/CircleLoadingIcon';
import { cx } from '@/index';
import { clsContainer, clsLoading, clsErrorCircle, clsLogo } from './styles.css';

export interface ConnectSpinnerProps extends BoxProps {
  isLoading?: boolean;
  isError?: boolean;
  thickness?: number;
  loadingColor?: string;
}

export function ConnectSpinner(props: ConnectSpinnerProps) {
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
    <Box className={cx('wk-connect-spinner', clsContainer, className)} {...restProps}>
      {isLoading && (
        <CircleLoadingIcon className={clsLoading} thickness={thickness} endColor={loadingColor} />
      )}
      {isError && <Box className={clsErrorCircle} />}

      <Box className={clsLogo}>{children}</Box>
    </Box>
  );
}
