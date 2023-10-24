import { Box, BoxProps } from '../../../../components/base/Box';
import { cx } from '../../../../utils/css';
import { infoTitle } from './styles.css';

export function InfoTitle(props: BoxProps) {
  const { className, children, ...restProps } = props;

  return (
    <Box className={cx('wk-info-title', infoTitle, className)} {...restProps}>
      {children}
    </Box>
  );
}
