import { cx } from '../../../utils/css';
import { Box, BoxProps } from '../Box';
import { clsLink } from './styles.css';

export type LinkProps = BoxProps;

export const Link = (props: LinkProps) => {
  const { className, ...restProps } = props;

  return (
    <Box as="a" className={cx(clsLink, className)} target="_blank" rel="noopener" {...restProps} />
  );
};

Link.displayName = 'Link';
