import * as UIKit from '@node-real/uikit';

import CodeBlock from '../CodeBlock';
import Playground from '../../playground';

export const MDXComponents = {
  Playground,
  h1: (props: any) => <UIKit.Heading fontSize="24" fontWeight="semibold" py={12} {...props} />,
  h2: (props: any) => {
    const { children, ...restProps } = props;

    return (
      <UIKit.Heading fontSize="20" py={12} position="relative" {...restProps}>
        <UIKit.Box as="span" id={children} position="absolute" top={-68}></UIKit.Box>
        {children}
      </UIKit.Heading>
    );
  },
  h3: (props: any) => <UIKit.Heading fontSize="16" py={12} {...props} />,
  h4: (props: any) => <UIKit.Heading fontSize="14" py={12} {...props} />,
  code: (props: any) => {
    if (props.className) {
      return <CodeBlock {...props} />;
    }
    return <UIKit.Text as="span" {...props} color="scene.danger.normal" />;
  },
  pre: (props: any) => <UIKit.Box {...props} />,
  p: (props: any) => <UIKit.Text as="p" {...props} />,
  table: (props: any) => (
    <UIKit.Box as="table" w="100%" textAlign="left" style={{ tableLayout: 'fixed' }} {...props} />
  ),
  thead: (props: any) => <UIKit.Box as="thead" bg="readable.border" p={8} {...props} />,
  tr: (props: any) => <UIKit.Box as="tr" borderBottom="1px solid readable.border" {...props} />,
  th: (props: any) => <UIKit.Box as="th" p={12} {...props} />,
  td: (props: any) => <UIKit.Box as="td" p={12} {...props} />,
  ul: (props: any) => <ul style={{ paddingLeft: 24 }} {...props} />,
  a: (props: any) => <UIKit.Link {...props} />,
};
