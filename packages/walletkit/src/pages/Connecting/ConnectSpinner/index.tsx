import { cx } from '../../../base/utils/css';
import { clsContainer, clsLogo, clsErrorCircle, clsLoading } from './styles.css';
import { Box, BoxProps } from '../../../base/components/Box';
import { CircleLoadingIcon } from '../../../base/icons/CircleLoadingIcon';

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
