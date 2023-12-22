import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';

import { rehypeMdxCodeMeta } from './plugins/rehype-code-meta';

const mdxOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [rehypeMdxCodeMeta],
};

export default defineConfig({
  base: './',
  server: {
    port: 8002,
    open: true,
    fs: {
      strict: false,
    },
  },
  plugins: [react(), mdx(mdxOptions) as any],
});
