import { Box, BoxProps } from '../../../components/base/Box';
import { cx } from '../../../utils/css';
import { content } from './styles.css';

export function Content(props: BoxProps) {
  const { className, ...restProps } = props;
  return <Box className={cx('wk-content', content, className)} {...restProps} />;
}
