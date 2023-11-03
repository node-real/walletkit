import { Box, BoxProps } from '../../../../base/Box';
import { cx } from '../../../../utils/css';
import { clsDescription } from './styles.css';

export function Description(props: BoxProps) {
  const { className, ...restProps } = props;

  return <Box className={cx('wk-description', clsDescription, className)} {...restProps} />;
}
