import { Box, BoxProps } from '../../../../components/base/Box';
import { AlertIcon } from '../../../../components/icons/AlertIcon';
import { cx } from '../../../../utils/css';
import { errorTitle } from './styles.css';

export function ErrorTitle(props: BoxProps) {
  const { className, children, ...restProps } = props;

  return (
    <Box className={cx('wk-error-title', errorTitle, className)} {...restProps}>
      <AlertIcon />
      {children}
    </Box>
  );
}
