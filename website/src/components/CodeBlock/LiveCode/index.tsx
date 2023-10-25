import { useState } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { Language, PrismTheme } from 'prism-react-renderer';
import { Box } from '@totejs/uikit';

import scope from './scope';
import { EditorStyles, PreviewStyles } from '../styles';
import CopyButton from '../CopyButton';

export interface LiveCodeProps {
  rawCode: string;
  language: Language;
  theme: PrismTheme;
}

export default function LiveCode(props: LiveCodeProps) {
  const { rawCode, language, ...otherProps } = props;
  const [editorCode, setEditorCode] = useState(rawCode);

  const onChange = (newCode: string) => {
    setEditorCode(newCode.trim());
  };

  const liveProviderProps = {
    code: editorCode,
    scope,
    ...otherProps,
  };

  return (
    <LiveProvider {...liveProviderProps}>
      <LivePreview style={PreviewStyles}></LivePreview>
      <Box {...EditorStyles}>
        <LiveEditor onChange={onChange}></LiveEditor>
        <CopyButton code={editorCode}></CopyButton>
      </Box>
      <LiveError></LiveError>
    </LiveProvider>
  );
}
