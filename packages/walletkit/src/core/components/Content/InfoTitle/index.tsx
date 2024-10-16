import { BoxProps, Box } from '@/core/base/components/Box';
import { cx } from '@/core/base/utils/css';
import { clsInfoTitle } from './styles.css';

export function InfoTitle(props: BoxProps) {
  const { className, children, ...restProps } = props;

  return (
    <Box className={cx(clsInfoTitle, 'wk-info-title', className)} {...restProps}>
      {children}
    </Box>
  );
}
