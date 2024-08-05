import { BoxProps, Box } from '@/ui/base/components/Box';
import { cx } from '@/ui/base/utils/css';
import { clsContent } from './styles.css';

export function Content(props: BoxProps) {
  const { className, ...restProps } = props;
  return <Box className={cx('wk-content', clsContent, className)} {...restProps} />;
}
