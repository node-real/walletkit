import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import path from 'path';
import mkcert from 'vite-plugin-mkcert';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: false,
  },
  plugins: [
    react(),
    vanillaExtractPlugin({
      identifiers: ({ hash }) => `wk_${hash}`,
    }),
    cssInjectedByJsPlugin({
      injectCode: (cssCode: string) => {
        return `try{if(typeof document != 'undefined'){var elementStyle = document.createElement('style');elementStyle.appendChild(document.createTextNode(${cssCode}));document.head.insertBefore(elementStyle,document.head.firstChild);}}catch(e){console.error('vite-plugin-css-injected-by-js', e);}`;
      },
    }),
    dts({
      include: 'src',
    }),
    mkcert(),
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
        'solana/index': 'src/solana/index.ts',
        'evm/index': 'src/evm/index.ts',
        'tron/index': 'src/tron/index.ts',
        'core/index': 'src/core/index.ts',
      },
    },
    rollupOptions: {
      plugins: [
        peerDepsExternal({
          includeDependencies: true,
        }),
      ],
      output: {
        chunkFileNames: 'chunks/chunk.js',
      },
    },
  },
});
