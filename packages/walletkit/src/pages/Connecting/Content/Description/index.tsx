import { BoxProps, Box } from '@/base/components/Box';
import { cx } from '@/index';
import { clsDescription } from './styles.css';

export function Description(props: BoxProps) {
  const { className, ...restProps } = props;

  return <Box className={cx('wk-description', clsDescription, className)} {...restProps} />;
}
