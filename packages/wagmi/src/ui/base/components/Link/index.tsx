import { clsLink } from './styles.css';
import { cx } from '@/ui/index';
import { Box, BoxProps } from '../Box';

export type LinkProps = BoxProps;

export const Link = (props: LinkProps) => {
  const { className, ...restProps } = props;

  return (
    <Box
      as="a"
      className={cx('wk-link', clsLink, className)}
      target="_blank"
      rel="noopener"
      {...restProps}
    />
  );
};

Link.displayName = 'Link';
