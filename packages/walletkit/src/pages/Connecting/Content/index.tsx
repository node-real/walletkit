import { Box, BoxProps } from '../../../base/Box';
import { cx } from '../../../utils/css';
import { clsContent } from './styles.css';

export function Content(props: BoxProps) {
  const { className, ...restProps } = props;
  return <Box className={cx('wk-content', clsContent, className)} {...restProps} />;
}
