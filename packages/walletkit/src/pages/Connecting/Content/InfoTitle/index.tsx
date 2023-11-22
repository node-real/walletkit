import { BoxProps, Box } from '@/base/components/Box';
import { cx } from '@/index';
import { clsInfoTitle } from './styles.css';

export function InfoTitle(props: BoxProps) {
  const { className, children, ...restProps } = props;

  return (
    <Box className={cx('wk-info-title', clsInfoTitle, className)} {...restProps}>
      {children}
    </Box>
  );
}
