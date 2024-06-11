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

const provider = (window as any).ethereum;

console.log('provider', provider);

// This will print 'undefined'
console.log(provider.request);
setTimeout(() => {
  // This is normal
  console.log('provider---', provider);
  console.log(provider.request);
}, 3000);

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
