import { useEffect, useState } from 'react';
import theme from 'prism-react-renderer/themes/nightOwl';

import LiveCode from './LiveCode';
import Highlight from './Highlight';

export default function CodeBlock(props: any) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { children, className, live = true } = props;

  const _live = live === 'true' || live === true;

  const language = className?.replace('language-', '');
  const rawCode = children.trim();

  if (isMounted && _live && language === 'jsx') {
    return <LiveCode rawCode={rawCode} language={language} theme={theme} />;
  }

  return <Highlight rawCode={rawCode} language={language} theme={theme} />;
}
