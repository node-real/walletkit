import { Box, BoxProps } from '../../../../components/base/Box';
import { cx } from '../../../../utils/css';
import { description } from './styles.css';

export function Description(props: BoxProps) {
  const { className, ...restProps } = props;

  return <Box className={cx('wk-description', description, className)} {...restProps} />;
}
