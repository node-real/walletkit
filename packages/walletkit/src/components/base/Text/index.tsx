import { Box, BoxProps } from '../Box';

export type TextProps = BoxProps;

export const Text = (props: TextProps) => {
  const { ...restProps } = props;
  return <Box as="p" {...restProps} />;
};

Text.displayName = 'Text';
