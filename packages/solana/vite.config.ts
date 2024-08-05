import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import dts from 'vite-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vanillaExtractPlugin({
      identifiers: ({ hash }) => `wk_${hash}`,
    }),
    dts({
      include: 'src',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@/ui': path.resolve(__dirname, 'src/ui'),
      '@/ui-data': path.resolve(__dirname, 'src/ui-data'),
      '@/core': path.resolve(__dirname, 'src/core'),
      '@/wallets': path.resolve(__dirname, 'src/wallets'),
    },
  },
  build: {
    target: 'esnext',
    minify: false,
    lib: {
      formats: ['es'],
      entry: {
        index: 'src/index.ts',
        'wallets/index': 'src/wallets/index.ts',
      },
    },
    rollupOptions: {
      plugins: [
        peerDepsExternal({
          includeDependencies: true,
        }),
      ],
      output: {
        chunkFileNames: 'chunk.js',
      },
    },
  },
});
