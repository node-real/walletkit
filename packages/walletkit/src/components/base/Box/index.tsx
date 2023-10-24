import styled from '@emotion/styled';
import { box } from './styles';

// type HTMLProperties<T = HTMLElement> = Omit<React.AllHTMLAttributes<T>, 'as'>;

// export type CSSProps = CSSProperties & {
//   [x: string]: CSSProps | number | string | null | undefined;
// };

// export interface BoxProps extends HTMLProperties {
//   as?: React.ElementType;
//   css?: CSSProps;
// }

// export const Box = React.forwardRef<HTMLElement, BoxProps>((props: BoxProps, ref: any) => {
//   const { as = 'div', css: cssProps, ...restProps } = props;

//   const baseStyle = x(box, cssProps);
//   const Component = styled.div(baseStyle);

//   return <Component as={as} ref={ref} {...restProps} />;
// });

// Box.displayName = 'Box';

export const Box = styled.div(box);
