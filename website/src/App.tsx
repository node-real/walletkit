import '@node-real/walletkit/styles.css';
import { ThemeProvider } from '@node-real/uikit';
import { Routes, Route } from 'react-router-dom';
import VConsole from 'vconsole';

import { theme } from './theme';
import { Layout } from './components/Layout';
import DocsPage from './pages/index.mdx';
import { MDXComponents } from './components/MDXComponent';
import { Playground } from './playground';

new VConsole();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Playground>
        <Layout>
          <Routes>
            <Route path="*" element={<DocsPage components={MDXComponents} />} />
          </Routes>
        </Layout>
      </Playground>
    </ThemeProvider>
  );
}
