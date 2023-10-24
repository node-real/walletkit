import { Box, BoxProps } from '../Box';

export type TextProps = BoxProps;

export const Text = (props: TextProps) => {
  const { css, ...restProps } = props;
  return <Box as="p" css={css} {...restProps} />;
};

Text.displayName = 'Text';
