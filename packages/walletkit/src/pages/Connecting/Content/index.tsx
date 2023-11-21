import { BoxProps, Box } from '@/base/components/Box';
import { cx } from '@/index';
import { clsContent } from '../styles.css';

export function Content(props: BoxProps) {
  const { className, ...restProps } = props;
  return <Box className={cx('wk-content', clsContent, className)} {...restProps} />;
}
