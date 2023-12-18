import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import dts from 'vite-plugin-dts';
import nodeResolve from '@rollup/plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vanillaExtractPlugin({
      identifiers: ({ hash }) => `wk_${hash}`,
    }),
    dts(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
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
      external: ['react', 'react-dom', 'ethers', 'wagmi', 'qrcode'],
      plugins: [peerDepsExternal(), nodeResolve()],
      output: {
        chunkFileNames: 'common.js',
      },
    },
  },
});
