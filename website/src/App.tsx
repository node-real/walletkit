import '@totejs/walletkit/styles.css';
import { ThemeProvider } from '@totejs/uikit';
import { Routes, Route } from 'react-router-dom';
import VConsole from 'vconsole';

import { theme } from './theme';
import { Layout } from './components/Layout';
import DocsPage from './pages/index.mdx';
import { MDXComponents } from './components/MDXComponent';

new VConsole();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="*" element={<DocsPage components={MDXComponents} />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
