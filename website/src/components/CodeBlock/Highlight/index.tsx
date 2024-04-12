import { Box } from '@node-real/uikit';
import BaseHighlight, { Language, defaultProps, PrismTheme } from 'prism-react-renderer';

import CopyButton from '../CopyButton';
import { EditorStyles } from '../styles';

export interface HighlightProps {
  rawCode: string;
  language: Language;
  theme: PrismTheme;
}

export default function Highlight(props: HighlightProps) {
  const { rawCode, language, ...otherProps } = props;

  return (
    <BaseHighlight {...defaultProps} code={rawCode} language={language} {...otherProps}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Box {...EditorStyles} data-language={language}>
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
          <CopyButton code={rawCode} />
        </Box>
      )}
    </BaseHighlight>
  );
}
