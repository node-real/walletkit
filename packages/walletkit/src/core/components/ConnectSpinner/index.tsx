import { CircleLoadingIcon } from '@/core/base/icons/CircleLoadingIcon';
import { clsContainer, clsLoading, clsErrorCircle, clsLogo } from './styles.css';
import { BoxProps, Box } from '@/core/base/components/Box';
import { cx } from '@/core/base/utils/css';

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
    <Box className={cx(clsContainer, 'wk-connect-spinner', className)} {...restProps}>
      {isLoading && (
        <CircleLoadingIcon className={clsLoading} thickness={thickness} endColor={loadingColor} />
      )}
      {isError && <Box className={clsErrorCircle} />}

      <Box className={clsLogo}>{children}</Box>
    </Box>
  );
}
