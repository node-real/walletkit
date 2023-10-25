import { cx } from '../../../utils/css';
import { Box, BoxProps } from '../../base/Box';
import { divider, dividerLine, dividerText } from './styles.css';

export type DividerWithTextProps = BoxProps;

export function DividerWithText(props: DividerWithTextProps) {
  const { className, children, ...restProps } = props;

  return (
    <Box className={cx('wk-divider', divider, className)} {...restProps}>
      <Box className={cx('wk-divider-line', dividerLine)} />
      <Box className={cx('wk-divider-text', dividerText)}>{children}</Box>
    </Box>
  );
}
