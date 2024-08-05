import { BoxProps, Box } from '@/ui/base/components/Box';
import { AlertIcon } from '@/ui/base/icons/AlertIcon';
import { cx } from '@/ui/base/utils/css';
import { clsErrorTitle } from './styles.css';

export function ErrorTitle(props: BoxProps) {
  const { className, children, ...restProps } = props;

  return (
    <Box className={cx('wk-error-title', clsErrorTitle, className)} {...restProps}>
      <AlertIcon />
      {children}
    </Box>
  );
}
