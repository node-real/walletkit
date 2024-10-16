import { BoxProps, Box } from '@/core/base/components/Box';
import { AlertIcon } from '@/core/base/icons/AlertIcon';
import { cx } from '@/core/base/utils/css';
import { clsErrorTitle } from './styles.css';

export function ErrorTitle(props: BoxProps) {
  const { className, children, ...restProps } = props;

  return (
    <Box className={cx(clsErrorTitle, 'wk-error-title', className)} {...restProps}>
      <AlertIcon />
      {children}
    </Box>
  );
}
