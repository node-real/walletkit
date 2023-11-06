import { Box, BoxProps } from '../../../../base/components/Box';
import { AlertIcon } from '../../../../base/icons/AlertIcon';

import { cx } from '../../../../utils/css';
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
