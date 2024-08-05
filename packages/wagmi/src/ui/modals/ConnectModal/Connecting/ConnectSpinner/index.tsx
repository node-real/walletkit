import { BoxProps, Box } from '@/ui/base/components/Box';
import { CircleLoadingIcon } from '@/ui/base/icons/CircleLoadingIcon';
import { cx } from '@/ui/base/utils/css';
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
