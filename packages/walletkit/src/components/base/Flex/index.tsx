import { x } from '../../../utils/css';
import { Box, BoxProps } from '../Box';

export type FlexProps = BoxProps;

export const Flex = (props: FlexProps) => {
  const { css, ...restProps } = props;
  return <Box css={x({ display: 'flex' }, css)} {...restProps} />;
};

Flex.displayName = 'Flex';
