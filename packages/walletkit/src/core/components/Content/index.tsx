import { BoxProps, Box } from '@/core/base/components/Box';
import { cx } from '@/core/base/utils/css';
import { clsContent } from './styles.css';

export function Content(props: BoxProps) {
  const { className, ...restProps } = props;
  return <Box className={cx(clsContent, 'wk-content', className)} {...restProps} />;
}
