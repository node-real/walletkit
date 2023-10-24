import { x } from '../../../utils/css';
import { Box, BoxProps } from '../Box';
import { link } from './styles';

export type LinkProps = BoxProps;

export const Link = (props: LinkProps) => {
  const { css, ...restProps } = props;

  return <Box as="a" css={x(link, css)} target="_blank" rel="noopener" {...restProps} />;
};

Link.displayName = 'Link';
