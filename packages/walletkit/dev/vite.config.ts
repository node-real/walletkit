import path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default defineConfig({
  envDir: './',
  root: './dev',
  plugins: [
    react(),
    vanillaExtractPlugin({
      identifiers: ({ hash }) => `wk_${hash}`,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
});
