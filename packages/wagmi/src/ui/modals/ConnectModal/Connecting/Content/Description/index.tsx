import { BoxProps, Box } from '@/ui/base/components/Box';
import { cx } from '@/ui/base/utils/css';
import { clsDescription } from './styles.css';

export function Description(props: BoxProps) {
  const { className, ...restProps } = props;

  return <Box className={cx('wk-description', clsDescription, className)} {...restProps} />;
}
